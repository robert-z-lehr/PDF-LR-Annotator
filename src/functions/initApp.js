import {buildLegend} from './buildLegend.js';
import {loadPdf} from './loadPdf.js';
import {exportAnnotations} from './exportAnnotations.js';
import {clearAnnotations} from './clearAnnotations.js';
import {handleKeydown} from './handleKeydown.js';
import {zoomIn} from './zoomIn.js';
import {zoomOut} from './zoomOut.js';
import {resetZoom} from './resetZoom.js';
import {syncVisualViewport} from './syncVisualViewport.js';
import {updateZoomControls} from './updateZoomControls.js';
export function initApp(){
  buildLegend();
  document.getElementById('fileInput').addEventListener('change',event=>loadPdf(event.target.files?.[0]));
  document.getElementById('saveBtn').addEventListener('click',exportAnnotations);
  document.getElementById('clearBtn').addEventListener('click',clearAnnotations);
  document.getElementById('zoomInBtn').addEventListener('click',zoomIn);
  document.getElementById('zoomOutBtn').addEventListener('click',zoomOut);
  document.getElementById('zoomResetBtn').addEventListener('click',resetZoom);
  document.addEventListener('keydown',handleKeydown);
  syncVisualViewport();
  window.visualViewport?.addEventListener('resize',syncVisualViewport);
  window.visualViewport?.addEventListener('scroll',syncVisualViewport);
  window.addEventListener('resize',syncVisualViewport);
  updateZoomControls();
}