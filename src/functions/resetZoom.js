import {state} from '../state.js';
import {setZoom} from './setZoom.js';
export function resetZoom(){return setZoom(state.defaultScale);}