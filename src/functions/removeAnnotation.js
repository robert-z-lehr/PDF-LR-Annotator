import {state} from '../state.js';
import {rebuildCategoryIndex} from './rebuildCategoryIndex.js';
import {updateLegendCounts} from './updateLegendCounts.js';
import {updateStatus} from './updateStatus.js';
import {closeCommentBox} from './closeCommentBox.js';
export function removeAnnotation(id){
  if(state.openCommentId===id)closeCommentBox();
  state.annotations=state.annotations.filter(annotation=>annotation.id!==id);
  document.querySelectorAll(`.highlight[data-id="${CSS.escape(id)}"]`).forEach(el=>el.remove());
  rebuildCategoryIndex();
  updateLegendCounts();
  updateStatus();
}