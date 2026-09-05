import {state} from '../state.js';
export function setSelectedCategory(index){
  state.selectedCategory=index;
  document.querySelectorAll('.legend-row').forEach((row,i)=>row.classList.toggle('active',i===index));
}