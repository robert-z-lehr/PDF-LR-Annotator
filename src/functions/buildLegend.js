import {categories} from '../categories.js';
import {state} from '../state.js';
import {setSelectedCategory} from './setSelectedCategory.js';
import {navigateHighlight} from './navigateHighlight.js';
import {updateLegendCounts} from './updateLegendCounts.js';
import {toast} from './toast.js';
export function buildLegend(){
  const legend=document.getElementById('legend');
  legend.innerHTML='';
  categories.forEach((category,index)=>{
    const row=document.createElement('div');
    row.className='legend-row'+(index===state.selectedCategory?' active':'');
    const swatch=document.createElement('button');
    swatch.className='swatch';
    swatch.style.background=category.color;
    swatch.title=`Select ${category.name} (${category.key})`;
    swatch.addEventListener('click',()=>{setSelectedCategory(index);toast(`${category.key}: ${category.name} selected`);});
    const input=document.createElement('input');
    input.className='legend-name';
    input.value=category.name;
    input.addEventListener('change',()=>{category.name=input.value.trim()||category.name;});
    const count=document.createElement('span');
    count.className='legend-count';
    count.dataset.category=String(index);
    count.textContent='0';
    const jump=document.createElement('button');
    jump.className='jump-btn';
    jump.textContent=`${category.key} →`;
    jump.title=`Jump to next ${category.name}`;
    jump.addEventListener('click',()=>{setSelectedCategory(index);navigateHighlight(1);});
    row.append(swatch,input,count,jump);
    legend.appendChild(row);
  });
  updateLegendCounts();
}