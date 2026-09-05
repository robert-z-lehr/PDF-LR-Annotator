import {state} from '../state.js';
import {setZoom} from './setZoom.js';
export function zoomOut(){return setZoom(state.scale-state.zoomStep);}