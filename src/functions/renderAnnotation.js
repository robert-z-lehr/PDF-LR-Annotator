import {categories} from '../categories.js';
import {removeAnnotation} from './removeAnnotation.js';
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
    el.title=`${categories[annotation.category].name}: click to remove`;
    el.addEventListener('click',event=>{event.stopPropagation();removeAnnotation(annotation.id);});
    layer.appendChild(el);
  });
}