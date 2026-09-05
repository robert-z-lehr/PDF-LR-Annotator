import {categories} from '../categories.js';
export function showHighlightTooltip(element,annotation){
  clearTimeout(element._tooltipTimer);
  element._tooltipTimer=setTimeout(()=>{
    let tooltip=document.getElementById('highlightTooltip');
    if(!tooltip){
      tooltip=document.createElement('div');
      tooltip.id='highlightTooltip';
      tooltip.className='highlight-tooltip';
      document.body.appendChild(tooltip);
    }
    tooltip.textContent=`${categories[annotation.category].name}: Click to add comment / Double-click to remove`;
    const rect=element.getBoundingClientRect();
    const left=Math.min(rect.left,window.innerWidth-tooltip.offsetWidth-12);
    const top=Math.max(8,rect.top-tooltip.offsetHeight-8);
    tooltip.style.left=`${Math.max(8,left)}px`;
    tooltip.style.top=`${top}px`;
    tooltip.classList.add('show');
  },250);
}