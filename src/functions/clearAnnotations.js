import {state} from '../state.js';
import {rebuildCategoryIndex} from './rebuildCategoryIndex.js';
import {updateStatus} from './updateStatus.js';
export function clearAnnotations(){
  state.annotations=[];
  state.navCurrentIdByCategory.clear();
  document.querySelectorAll('.highlight').forEach(el=>el.remove());
  rebuildCategoryIndex();
  updateStatus();
}