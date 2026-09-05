import {state} from '../state.js';
export function updateZoomControls(){
  const loaded=Boolean(state.pdf);
  document.getElementById('zoomInBtn').disabled=!loaded||state.scale>=state.maxScale;
  document.getElementById('zoomOutBtn').disabled=!loaded||state.scale<=state.minScale;
  document.getElementById('zoomResetBtn').disabled=!loaded||Math.abs(state.scale-state.defaultScale)<0.001;
  const percent=Math.round((state.scale/state.defaultScale)*100);
  document.getElementById('zoomLevel').textContent=`${percent}%`;
}