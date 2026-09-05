import {state} from '../state.js';
import {setZoom} from './setZoom.js';
export function zoomIn(){return setZoom(state.scale+state.zoomStep);}