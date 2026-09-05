import {hideHighlightTooltip} from './hideHighlightTooltip.js';
import {removeAnnotation} from './removeAnnotation.js';
export function handleHighlightDoubleClick(event,element,annotation){
  event.preventDefault();
  event.stopPropagation();
  clearTimeout(element._singleClickTimer);
  hideHighlightTooltip(element);
  removeAnnotation(annotation.id);
}