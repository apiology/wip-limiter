import { logError } from './error';

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
      logError(`Could not find text under ${headerButton}`);
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
    const className = 'ProjectSpreadsheetGridRow-dropTargetRow';
    return Array.from(this.taskGroup.getElementsByClassName(className));
  }

  markBackgroundColor() {
    const wipLimit = this.wipLimit();
    if (wipLimit === null) {
      this.markAsUnderLimit();
    } else {
      const childCount = this.countChildren();
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
  const taskGroups = Array.from(document.getElementsByClassName('TaskGroup--withHeader'));
  taskGroups.forEach((taskGroupElement) => {
    const taskGroup = new TaskGroup(taskGroupElement);
    taskGroup.markBackgroundColor();
  });
};

export default 'processOnce';
