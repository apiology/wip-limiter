import Wipable from './wipable';

export default class TaskGroup extends Wipable {
  taskGroup: Element;

  constructor(taskGroup: Element) {
    super();
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

  elementsToMark() {
    const children = this.children();
    console.debug('children:', children);
    return children.flatMap((child: Element) => Array.from(child.getElementsByClassName('SpreadsheetGridTaskNameAndDetailsCellGroup-rowNumber')));
  }
}
