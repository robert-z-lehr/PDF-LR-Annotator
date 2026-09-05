import {openCommentBox} from './openCommentBox.js';
export function handleHighlightClick(event,element,annotation){
  event.stopPropagation();
  clearTimeout(element._singleClickTimer);
  element._singleClickTimer=setTimeout(()=>openCommentBox(annotation),240);
}