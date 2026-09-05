export function layoutCommentBoxes(page){
  const wrap=document.querySelector(`.page-wrap[data-page="${page}"]`);
  if(!wrap)return;
  const boxes=Array.from(wrap.querySelectorAll('.comment-box'))
    .sort((a,b)=>Number(a.dataset.anchorY||0)-Number(b.dataset.anchorY||0));
  let previousBottom=0;
  for(const box of boxes){
    const anchorY=Number(box.dataset.anchorY||8);
    const top=Math.max(8,anchorY,previousBottom+10);
    box.style.top=`${top}px`;
    previousBottom=top+box.offsetHeight;
  }
}