/**
 * wip-limiter module.
 *
 * Chrome extension to get a visual hint when your Kanban-style WIP
 * limit has been exceeded in Asana.
 */

((css) => {
  const head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
})(`
  .wip-limit-under { }
  .wip-limit-over {
    background-color: rgb(214, 65, 65) !important;
  }
  .wip-limit-on-edge {
    background-color: rgb(239, 190, 67) !important;
  }
`);

class TaskGroup {
  taskGroup: Element;

  constructor(taskGroup: Element) {
    this.taskGroup = taskGroup;
  }

  // header.classList.contains("bar-row")
  title(): string {
    const nameButtons = this.taskGroup.getElementsByClassName('PotColumnName-nameButton');
    const headerButton = nameButtons[0];
    const content = headerButton.textContent;
    if (content == null) {
      throw new Error(`Could not find text under ${headerButton}`);
    }
    return content;
  }

  wipLimit() {
    const title = this.title();
    const wipFinder = /.*\[(\d*)\]$/;
    const results = wipFinder.exec(title);
    if (results !== null) {
      return parseInt(results[1], 10);
    }
    return null;
  }

  countChildren() {
    const children = this.children();
    const count = children.length;
    return count;
  }

  children(): Element[] {
    const projectClassName = 'ProjectSpreadsheetGridRow-dropTargetRow';
    console.debug({ taskGroup: this.taskGroup });
    let tasks = Array.from(this.taskGroup.getElementsByClassName(projectClassName));
    if (tasks.length === 0) {
      const myTasksClassName = 'MyTasksSpreadsheetGridRow-dropTargetRow';
      tasks = Array.from(this.taskGroup.getElementsByClassName(myTasksClassName));
    }
    return tasks;
  }

  markBackgroundColor() {
    const wipLimit = this.wipLimit();
    console.debug('found wip limit of ', wipLimit, ' for ', this.title());
    if (wipLimit === null) {
      this.markAsUnderLimit();
    } else {
      const childCount = this.countChildren();
      console.debug('found child count of ', childCount, ' for ', this.title());
      if (wipLimit === childCount) {
        this.markAsOnEdge();
      } else if (wipLimit < childCount) {
        this.markAsOverLimit();
      } else {
        this.markAsUnderLimit();
      }
    }
  }

  elementsToMark() {
    const children = this.children();
    return children.flatMap((child: Element) => Array.from(child.getElementsByClassName('SpreadsheetGridTaskNameCell-rowNumber')));
  }

  markAsOnEdge() {
    this.elementsToMark().forEach((child) => {
      child.classList.remove('wip-limit-under');
      child.classList.remove('wip-limit-over');
      child.classList.add('wip-limit-on-edge');
    });
  }

  markAsOverLimit() {
    this.elementsToMark().forEach((child) => {
      child.classList.remove('wip-limit-under');
      child.classList.add('wip-limit-over');
      child.classList.remove('wip-limit-on-edge');
    });
  }

  markAsUnderLimit() {
    this.elementsToMark().forEach((child) => {
      child.classList.add('wip-limit-under');
      child.classList.remove('wip-limit-over');
      child.classList.remove('wip-limit-on-edge');
    });
  }
}

export const processOnce = () => {
  console.debug('WIP limiter - processOnce');
  const taskGroups = Array.from(document.getElementsByClassName('TaskGroup--withHeader'));
  console.debug({ taskGroups });
  taskGroups.forEach((taskGroupElement) => {
    const taskGroup = new TaskGroup(taskGroupElement);
    taskGroup.markBackgroundColor();
  });
};

export default 'processOnce';
