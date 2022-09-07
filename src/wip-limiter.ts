/**
 * wip-limiter module.
 *
 * Chrome extension to get a visual hint when your Kanban-style WIP
 * limit has been exceeded in Asana.
 */

import SubtaskSection from './subtask-section';
import TaskGroup from './task-group';

((css) => {
  const head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  const style = document.createElement('style');
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

const isSubtaskSectionElement = (e: Element) => e.classList.contains('SectionRow');

const buildSubtaskSections = (elements: Element[]): SubtaskSection[] => {
  let currentSectionElement: Element | null = null;
  let currentChildElements: Element[] = [];
  const subtaskSections: SubtaskSection[] = [];

  const addSubtaskSection = () => {
    if (currentSectionElement != null && currentChildElements.length > 0) {
      const newSubtaskSection = new SubtaskSection(currentSectionElement,
        currentChildElements);
      subtaskSections.push(newSubtaskSection);
    }
  };
  for (const element of elements) {
    if (isSubtaskSectionElement(element)) {
      console.debug('Found a subtask section', element);
      addSubtaskSection();
      currentSectionElement = element;
      currentChildElements = [];
    } else {
      console.debug('Found a subtask child', element);
      currentChildElements.push(element);
    }
  }
  addSubtaskSection();
  return subtaskSections;
};

export const processOnce = () => {
  console.debug('WIP limiter - processOnce');
  const taskGroups = Array.from(document.getElementsByClassName('TaskGroup--withHeader'));
  console.debug({ taskGroups });
  taskGroups.forEach((taskGroupElement) => {
    const taskGroup = new TaskGroup(taskGroupElement);
    taskGroup.markBackgroundColor();
  });

  const subtaskItemRows = Array.from(document.getElementsByClassName('ItemRow'));
  console.debug({ subtaskItemRows });
  const subtaskSections = buildSubtaskSections(subtaskItemRows);
  console.debug({ subtaskSections });
  subtaskSections.forEach((subtaskSection) => {
    subtaskSection.markBackgroundColor();
  });
};

export default 'processOnce';
