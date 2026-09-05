import {state} from '../state.js';
import {updateZoomControls} from './updateZoomControls.js';
export function updateStatus(){
  const n=state.annotations.length;
  const status=document.getElementById('status');
  if(state.pdf){
    status.textContent=`${state.fileName} · ${state.pdf.numPages} pages · ${n} highlight${n===1?'':'s'}`;
    status.title=state.fileName||'';
  }else{
    status.textContent='Load a PDF to begin.';
    status.removeAttribute('title');
  }
  document.getElementById('saveBtn').disabled=!n;
  document.getElementById('clearBtn').disabled=!n;
  updateZoomControls();
}