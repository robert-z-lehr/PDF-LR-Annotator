import {categories} from '../categories.js';
import {setSelectedCategory} from './setSelectedCategory.js';
import {navigateHighlight} from './navigateHighlight.js';
import {clearClickStart} from './clearClickStart.js';
export function handleKeydown(event){
  const tag=document.activeElement?.tagName;
  if(tag==='INPUT'||tag==='TEXTAREA'||document.activeElement?.isContentEditable)return;
  if(event.key>='1'&&event.key<='7'){
    setSelectedCategory(Number(event.key)-1);
    event.preventDefault();
    return;
  }
  if(event.key==='Enter'){
    navigateHighlight(event.shiftKey?-1:1);
    event.preventDefault();
    return;
  }
  if(event.key==='Escape'){
    clearClickStart();
    window.getSelection()?.removeAllRanges();
    event.preventDefault();
  }
}