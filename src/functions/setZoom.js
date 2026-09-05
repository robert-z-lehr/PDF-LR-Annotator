import {state} from '../state.js';
import {renderDocument} from './renderDocument.js';
import {updateZoomControls} from './updateZoomControls.js';
export async function setZoom(nextScale){
  if(!state.pdf)return;
  const bounded=Math.min(state.maxScale,Math.max(state.minScale,nextScale));
  if(Math.abs(bounded-state.scale)<0.001){updateZoomControls();return;}
  state.scale=bounded;
  state.renderToken++;
  const token=state.renderToken;
  updateZoomControls();
  await renderDocument(token);
}