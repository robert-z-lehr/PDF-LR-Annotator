import {state} from '../state.js';
import {rebuildCategoryIndex} from './rebuildCategoryIndex.js';
import {updateStatus} from './updateStatus.js';
export function removeAnnotation(id){
  state.annotations=state.annotations.filter(annotation=>annotation.id!==id);
  document.querySelectorAll(`.highlight[data-id="${CSS.escape(id)}"]`).forEach(el=>el.remove());
  rebuildCategoryIndex();
  updateStatus();
}