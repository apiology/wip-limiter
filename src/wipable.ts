export abstract class Wipable {
  abstract title(): string;

  abstract elementsToMark(): Element[];

  abstract children(): Element[];

  countChildren() {
    const children = this.children();
    const count = children.length;
    return count;
  }

  wipLimit() {
    const title = this.title();
    const wipFinder = /.*\[(\d*)\]:?$/;
    const results = wipFinder.exec(title);
    if (results !== null) {
      const limit = results[1];
      if (limit != null) {
        return parseInt(limit, 10);
      }
    }
    return null;
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

  markAsOnEdge() {
    this.elementsToMark().forEach((child) => {
      child.classList.remove('wip-limit-under');
      child.classList.remove('wip-limit-over');
      child.classList.add('wip-limit-on-edge');
    });
  }

  markAsOverLimit() {
    const elements = this.elementsToMark();
    console.debug('marking as over limit:', elements);
    elements.forEach((child) => {
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
