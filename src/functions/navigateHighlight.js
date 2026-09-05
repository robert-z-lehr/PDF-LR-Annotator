import {categories} from '../categories.js';
import {state} from '../state.js';
import {toast} from './toast.js';
export function navigateHighlight(direction=1){
  const category=state.selectedCategory;
  const ids=state.categoryIndex.get(category)||[];
  if(!ids.length){toast(`No ${categories[category].name} highlights yet.`);return;}
  const currentId=state.navCurrentIdByCategory.get(category);
  let index=currentId?ids.indexOf(currentId):-1;
  index=direction>0?(index+1+ids.length)%ids.length:(index<=0?ids.length-1:index-1);
  const id=ids[index];
  state.navCurrentIdByCategory.set(category,id);
  const el=document.querySelector(`.highlight[data-id="${CSS.escape(id)}"]`);
  if(!el)return;
  el.scrollIntoView({behavior:'smooth',block:'center',inline:'nearest'});
  document.querySelectorAll('.highlight.flash').forEach(node=>node.classList.remove('flash'));
  el.classList.add('flash');
  setTimeout(()=>el.classList.remove('flash'),900);
  toast(`${categories[category].name}: ${index+1} of ${ids.length}`);
}