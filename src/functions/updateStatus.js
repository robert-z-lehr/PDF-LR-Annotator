import {state} from '../state.js';
export function updateStatus(){
  const n=state.annotations.length;
  const status=document.getElementById('status');
  status.textContent=state.pdf?`${state.fileName} · ${state.pdf.numPages} pages · ${n} highlight${n===1?'':'s'}`:'Load a PDF to begin.';
  document.getElementById('saveBtn').disabled=!n;
  document.getElementById('clearBtn').disabled=!n;
}