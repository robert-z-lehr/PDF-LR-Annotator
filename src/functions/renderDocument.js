import {TextLayer} from '../pdfjs.js';
import {state} from '../state.js';
import {applyCurrentSelection} from './applyCurrentSelection.js';
import {handleTwoClick} from './handleTwoClick.js';
import {renderAnnotation} from './renderAnnotation.js';
export async function renderDocument(token){
  const viewer=document.getElementById('viewer');
  const empty=document.getElementById('empty');
  viewer.innerHTML='';
  empty.hidden=true;
  viewer.hidden=false;
  for(let pageNumber=1;pageNumber<=state.pdf.numPages;pageNumber++){
    if(token!==state.renderToken)return;
    const page=await state.pdf.getPage(pageNumber);
    const viewport=page.getViewport({scale:state.scale});
    const wrap=document.createElement('section');
    wrap.className='page-wrap';
    wrap.dataset.page=pageNumber;
    wrap.style.width=`${viewport.width}px`;
    wrap.style.height=`${viewport.height}px`;
    const canvas=document.createElement('canvas');
    const ratio=window.devicePixelRatio||1;
    canvas.width=Math.ceil(viewport.width*ratio);
    canvas.height=Math.ceil(viewport.height*ratio);
    canvas.style.width=`${viewport.width}px`;
    canvas.style.height=`${viewport.height}px`;
    const context=canvas.getContext('2d',{alpha:false});
    const transform=ratio!==1?[ratio,0,0,ratio,0,0]:null;
    const textLayerDiv=document.createElement('div');
    textLayerDiv.className='textLayer';
    textLayerDiv.style.width=`${viewport.width}px`;
    textLayerDiv.style.height=`${viewport.height}px`;
    const highlightLayer=document.createElement('div');
    highlightLayer.className='highlightLayer';
    const label=document.createElement('div');
    label.className='page-label';
    label.textContent=`p. ${pageNumber}`;
    wrap.append(canvas,textLayerDiv,highlightLayer,label);
    viewer.appendChild(wrap);
    await page.render({canvasContext:context,viewport,transform}).promise;
    const textContent=await page.getTextContent();
    const textLayer=new TextLayer({textContentSource:textContent,container:textLayerDiv,viewport});
    await textLayer.render();
    textLayerDiv.addEventListener('mouseup',()=>{if(!document.getElementById('twoClickMode').checked)setTimeout(applyCurrentSelection,0);});
    textLayerDiv.addEventListener('click',event=>{if(document.getElementById('twoClickMode').checked)handleTwoClick(event,wrap);});
  }
  if(token!==state.renderToken)return;
  state.annotations.forEach(renderAnnotation);
}