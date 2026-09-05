import {categories} from '../categories.js';
import {state} from '../state.js';
export function updateLegendCounts(){
  categories.forEach((_,index)=>{
    const count=state.annotations.filter(annotation=>annotation.category===index).length;
    const badge=document.querySelector(`.legend-count[data-category="${index}"]`);
    if(badge){
      badge.textContent=String(count);
      badge.title=`${count} highlight${count===1?'':'s'}`;
      badge.setAttribute('aria-label',`${count} highlight${count===1?'':'s'}`);
    }
  });
}