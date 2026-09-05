import {categories} from '../categories.js';
import {state} from '../state.js';
export function rebuildCategoryIndex(){
  state.categoryIndex=new Map();
  categories.forEach((_,category)=>{
    const ids=state.annotations
      .filter(annotation=>annotation.category===category)
      .sort((a,b)=>{
        if(a.page!==b.page)return a.page-b.page;
        const ar=a.rects[0]||{y:0,x:0};
        const br=b.rects[0]||{y:0,x:0};
        if(ar.y!==br.y)return ar.y-br.y;
        return ar.x-br.x;
      })
      .map(annotation=>annotation.id);
    state.categoryIndex.set(category,ids);
    const current=state.navCurrentIdByCategory.get(category);
    if(current&&!ids.includes(current))state.navCurrentIdByCategory.delete(category);
  });
}