export function caretAtPoint(x,y){
  if(document.caretPositionFromPoint){
    const position=document.caretPositionFromPoint(x,y);
    if(position)return{node:position.offsetNode,offset:position.offset};
  }
  if(document.caretRangeFromPoint){
    const range=document.caretRangeFromPoint(x,y);
    if(range)return{node:range.startContainer,offset:range.startOffset};
  }
  return null;
}