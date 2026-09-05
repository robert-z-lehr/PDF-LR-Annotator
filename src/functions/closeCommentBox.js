import {state} from '../state.js';
export function closeCommentBox(){
  document.querySelectorAll('.comment-box').forEach(box=>box.remove());
  document.getElementById('viewer')?.classList.remove('comments-open');
  state.openCommentId=null;
}