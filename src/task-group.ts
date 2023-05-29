import { Wipable } from './wipable.js';

export class TaskGroup extends Wipable {
  taskGroup: Element;

  constructor(taskGroup: Element) {
    super();
    this.taskGroup = taskGroup;
  }

  // header.classList.contains("bar-row")
  title(): string {
    const nameButtons = this.taskGroup.getElementsByClassName('PotColumnName-nameButton');
    const headerButton = nameButtons[0];
    const content = headerButton?.textContent;
    if (content == null) {
      throw new Error(`Could not find text under ${headerButton}`);
    }
    return content;
  }

  children(): Element[] {
    const legacyProjectClassName = 'ProjectSpreadsheetGridRow-dropTargetRow';
    console.debug({ taskGroup: this.taskGroup });
    let tasks = Array.from(this.taskGroup.getElementsByClassName(legacyProjectClassName));
    if (tasks.length === 0) {
      const myTasksClassName = 'MyTasksSpreadsheetGridRow-dropTargetRow';
      tasks = Array.from(this.taskGroup.getElementsByClassName(myTasksClassName));
      if (tasks.length === 0) {
        const projectClassName = 'SpreadsheetTaskRow';
        tasks = Array.from(this.taskGroup.getElementsByClassName(projectClassName));
      }
    }
    return tasks;
  }

  elementsToMark() {
    const children = this.children();
    console.debug('children:', children);
    return children.flatMap((child: Element) => Array.from(child.getElementsByClassName('SpreadsheetGridTaskNameAndDetailsCellGroup-rowNumber')));
  }
}
