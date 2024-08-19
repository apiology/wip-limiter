import { Wipable } from './wipable.js';

export class BoardColumn extends Wipable {
  private boardColumnElement: Element;

  constructor(boardColumnElement: Element) {
    super();
    this.boardColumnElement = boardColumnElement;
  }

  private titleElement(): Element | null {
    return this.boardColumnElement.querySelector('.BoardColumnHeader-headerTitle');
  }

  title(): string {
    const content = this.titleElement()?.textContent;
    if (content == null) {
      throw new Error(`Could not find text under ${this.boardColumnElement}`);
    }
    return content;
  }

  children(): HTMLElement[] {
    return Array.from(this.boardColumnElement.querySelectorAll('.SortableList-itemContainer--column .SortableList-sortableItemContainer'));
  }

  elementsToMark() {
    const element = this.titleElement()?.nextElementSibling;
    if (element == null) {
      throw new Error(`Could not find text under ${this.boardColumnElement}`);
    }
    return [element];
  }
}
