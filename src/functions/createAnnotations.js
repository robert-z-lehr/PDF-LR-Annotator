import {categories} from '../categories.js';
import {state} from '../state.js';
import {renderAnnotation} from './renderAnnotation.js';
import {rebuildCategoryIndex} from './rebuildCategoryIndex.js';
import {updateLegendCounts} from './updateLegendCounts.js';
import {updateStatus} from './updateStatus.js';
import {toast} from './toast.js';
export function createAnnotations(groups,text){
  const root=crypto.randomUUID?.()||`${Date.now()}-${Math.random().toString(16).slice(2)}`;
  groups.forEach((group,i)=>{
    const annotation={id:`${root}-${i}`,page:group.page,category:state.selectedCategory,text,comment:'',rects:group.rects,createdAt:new Date().toISOString()};
    state.annotations.push(annotation);
    renderAnnotation(annotation);
  });
  rebuildCategoryIndex();
  updateLegendCounts();
  updateStatus();
  toast(`${categories[state.selectedCategory].name}: highlight added`);
}