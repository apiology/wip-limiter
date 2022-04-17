import Wipable from './wipable';

export default class SubtaskSection extends Wipable {
  sectionElement: Element

  childElements: Element[]

  constructor(sectionElement: Element,
    childElements: Element[]) {
    super();
    this.sectionElement = sectionElement;
    this.childElements = childElements;
  }

  title() {
    const content = this.sectionElement.querySelector('.TaskName > textarea')?.textContent;
    if (content == null) {
      throw new Error(`Could not find text under ${this.sectionElement}`);
    }
    return content;
  }

  children() {
    return this.childElements;
  }

  elementsToMark() {
    // there's no task numbering column in subtasks as of 2022-04, and
    // the grip bar on the left only shows during hoverover, so let's
    // use the title
    const textArea = this.sectionElement.querySelector('.TaskName > textarea');
    if (textArea == null) {
      throw new Error(`Could not find textArea under ${this.sectionElement}`);
    }
    return [textArea];
  }
}
