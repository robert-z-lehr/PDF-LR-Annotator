import {groupedRectsFromRange} from './groupedRectsFromRange.js';
import {createAnnotations} from './createAnnotations.js';
export function applyCurrentSelection(){
  const selection=window.getSelection();
  if(!selection||selection.rangeCount===0||selection.isCollapsed)return;
  const range=selection.getRangeAt(0);
  const startEl=range.startContainer.nodeType===1?range.startContainer:range.startContainer.parentElement;
  const endEl=range.endContainer.nodeType===1?range.endContainer:range.endContainer.parentElement;
  if(!startEl?.closest?.('.textLayer')||!endEl?.closest?.('.textLayer'))return;
  const groups=groupedRectsFromRange(range);
  const text=selection.toString().trim();
  if(!groups.length||!text)return;
  createAnnotations(groups,text);
  selection.removeAllRanges();
}