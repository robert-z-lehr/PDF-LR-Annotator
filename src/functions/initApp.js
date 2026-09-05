import {buildLegend} from './buildLegend.js';
import {loadPdf} from './loadPdf.js';
import {exportAnnotations} from './exportAnnotations.js';
import {clearAnnotations} from './clearAnnotations.js';
import {handleKeydown} from './handleKeydown.js';
export function initApp(){
  buildLegend();
  document.getElementById('fileInput').addEventListener('change',event=>loadPdf(event.target.files?.[0]));
  document.getElementById('saveBtn').addEventListener('click',exportAnnotations);
  document.getElementById('clearBtn').addEventListener('click',clearAnnotations);
  document.addEventListener('keydown',handleKeydown);
}