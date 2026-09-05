import {categories} from '../categories.js';
import {state} from '../state.js';
export function exportAnnotations(){
  const payload={schemaVersion:'0.2',pdfFileName:state.fileName,exportedAt:new Date().toISOString(),categories,annotations:state.annotations};
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const link=document.createElement('a');
  link.href=url;
  link.download=`${(state.fileName||'annotations').replace(/\.pdf$/i,'')}.lr-annotations.json`;
  link.click();
  URL.revokeObjectURL(url);
}