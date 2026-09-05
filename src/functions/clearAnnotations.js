import {state} from '../state.js';
import {rebuildCategoryIndex} from './rebuildCategoryIndex.js';
import {updateLegendCounts} from './updateLegendCounts.js';
import {updateStatus} from './updateStatus.js';
export function clearAnnotations(){
  state.annotations=[];
  state.navCurrentIdByCategory.clear();
  state.openCommentIds.clear();
  document.querySelectorAll('.highlight,.comment-box').forEach(el=>el.remove());
  document.getElementById('viewer')?.classList.remove('comments-open');
  rebuildCategoryIndex();
  updateLegendCounts();
  updateStatus();
}