import {state} from '../state.js';
export function clearClickStart(){
  state.clickStart=null;
  document.querySelectorAll('.click-marker').forEach(el=>el.remove());
}