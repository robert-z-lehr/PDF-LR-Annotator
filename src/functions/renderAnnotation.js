import {categories} from '../categories.js';
import {state} from '../state.js';
import {showHighlightTooltip} from './showHighlightTooltip.js';
import {hideHighlightTooltip} from './hideHighlightTooltip.js';
import {handleHighlightClick} from './handleHighlightClick.js';
import {handleHighlightDoubleClick} from './handleHighlightDoubleClick.js';
export function renderAnnotation(annotation){
  const wrap=document.querySelector(`.page-wrap[data-page="${annotation.page}"]`);
  const layer=wrap?.querySelector('.highlightLayer');
  if(!wrap||!layer)return;
  annotation.rects.forEach(rect=>{
    const el=document.createElement('div');
    el.className='highlight';
    el.dataset.id=annotation.id;
    el.style.left=`${rect.x*100}%`;
    el.style.top=`${rect.y*100}%`;
    el.style.width=`${rect.w*100}%`;
    el.style.height=`${rect.h*100}%`;
    el.style.background=categories[annotation.category].color;
    if(state.navCurrentIdByCategory.get(annotation.category)===annotation.id)el.classList.add('current');
    el.addEventListener('mouseenter',()=>showHighlightTooltip(el,annotation));
    el.addEventListener('mouseleave',()=>hideHighlightTooltip(el));
    el.addEventListener('click',event=>handleHighlightClick(event,el,annotation));
    el.addEventListener('dblclick',event=>handleHighlightDoubleClick(event,el,annotation));
    layer.appendChild(el);
  });
}