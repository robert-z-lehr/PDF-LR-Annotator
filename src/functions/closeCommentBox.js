import {state} from '../state.js';
import {layoutCommentBoxes} from './layoutCommentBoxes.js';
export function closeCommentBox(id){
  if(!id)return;
  const box=document.querySelector(`.comment-box[data-id="${CSS.escape(id)}"]`);
  const page=box?.closest?.('.page-wrap')?.dataset.page;
  box?.remove();
  state.openCommentIds.delete(id);
  if(!document.querySelector('.comment-box'))document.getElementById('viewer')?.classList.remove('comments-open');
  if(page)layoutCommentBoxes(Number(page));
}