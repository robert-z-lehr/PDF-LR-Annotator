import {state} from '../state.js';
import {caretAtPoint} from './caretAtPoint.js';
import {clearClickStart} from './clearClickStart.js';
import {groupedRectsFromRange} from './groupedRectsFromRange.js';
import {createAnnotations} from './createAnnotations.js';
import {toast} from './toast.js';
export function handleTwoClick(event,wrap){
  if(event.target.closest('.highlight'))return;
  const position=caretAtPoint(event.clientX,event.clientY);
  if(!position)return;
  const el=position.node.nodeType===1?position.node:position.node.parentElement;
  if(!el?.closest('.textLayer'))return;
  if(!state.clickStart){
    state.clickStart={...position,page:Number(wrap.dataset.page)};
    const marker=document.createElement('div');
    const box=wrap.getBoundingClientRect();
    marker.className='click-marker';
    marker.style.left=`${event.clientX-box.left}px`;
    marker.style.top=`${event.clientY-box.top}px`;
    wrap.appendChild(marker);
    toast('Start set. Click the end point.');
    return;
  }
  if(state.clickStart.page!==Number(wrap.dataset.page)){
    toast('Two-click mode currently requires both clicks on the same page.');
    clearClickStart();
    return;
  }
  try{
    const range=document.createRange();
    range.setStart(state.clickStart.node,state.clickStart.offset);
    range.setEnd(position.node,position.offset);
    if(range.collapsed){clearClickStart();return;}
    const text=range.toString().trim();
    const groups=groupedRectsFromRange(range);
    if(text&&groups.length)createAnnotations(groups,text);
  }catch(error){console.error(error);toast('Could not create that range.');}
  clearClickStart();
}