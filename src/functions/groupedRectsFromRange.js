export function groupedRectsFromRange(range){
  const grouped=new Map();
  for(const rect of Array.from(range.getClientRects()).filter(r=>r.width>1&&r.height>1)){
    const node=range.commonAncestorContainer.nodeType===1?range.commonAncestorContainer:range.commonAncestorContainer.parentElement;
    const wrap=node?.closest?.('.page-wrap');
    if(!wrap)continue;
    const page=Number(wrap.dataset.page);
    const box=wrap.getBoundingClientRect();
    const normalized={x:(rect.left-box.left)/box.width,y:(rect.top-box.top)/box.height,w:rect.width/box.width,h:rect.height/box.height};
    if(!grouped.has(page))grouped.set(page,[]);
    grouped.get(page).push(normalized);
  }
  return Array.from(grouped,([page,rects])=>({page,rects}));
}