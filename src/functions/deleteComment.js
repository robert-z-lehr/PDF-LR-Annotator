import {closeCommentBox} from './closeCommentBox.js';
export function deleteComment(annotation){
  annotation.comment='';
  closeCommentBox(annotation.id);
}