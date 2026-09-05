import {pdfjsLib} from '../pdfjs.js';
import {state} from '../state.js';
import {renderDocument} from './renderDocument.js';
import {clearClickStart} from './clearClickStart.js';
import {rebuildCategoryIndex} from './rebuildCategoryIndex.js';
import {updateStatus} from './updateStatus.js';
import {toast} from './toast.js';
export async function loadPdf(file){
  if(!file)return;
  try{
    state.renderToken+=1;
    const token=state.renderToken;
    const data=new Uint8Array(await file.arrayBuffer());
    state.pdfBytes=data.slice();
    document.getElementById('status').textContent=`Loading ${file.name}…`;
    state.pdf=await pdfjsLib.getDocument({data}).promise;
    if(token!==state.renderToken)return;
    state.fileName=file.name;
    state.scale=state.defaultScale;
    state.annotations=[];
    state.navCurrentIdByCategory.clear();
    state.openCommentIds.clear();
    clearClickStart();
    rebuildCategoryIndex();
    await renderDocument(token);
    updateStatus();
    toast('PDF loaded. Choose a category, then drag across text.');
  }catch(error){
    console.error(error);
    document.getElementById('status').textContent='Could not open PDF.';
    toast('PDF load failed.');
  }
}