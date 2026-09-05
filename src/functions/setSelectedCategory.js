import {state} from '../state.js';
export function setSelectedCategory(index){
  const changed=state.selectedCategory!==index;
  state.selectedCategory=index;
  document.querySelectorAll('.legend-row').forEach((row,i)=>row.classList.toggle('active',i===index));
  if(changed)document.querySelectorAll('.highlight.current').forEach(node=>node.classList.remove('current'));
}