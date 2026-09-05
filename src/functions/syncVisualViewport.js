export function syncVisualViewport(){
  const viewport=window.visualViewport;
  const root=document.documentElement;
  if(!viewport){
    root.style.setProperty('--visual-left','0px');
    root.style.setProperty('--visual-top','0px');
    root.style.setProperty('--visual-width','100vw');
    root.style.setProperty('--visual-height','100vh');
    return;
  }
  root.style.setProperty('--visual-left',`${viewport.offsetLeft}px`);
  root.style.setProperty('--visual-top',`${viewport.offsetTop}px`);
  root.style.setProperty('--visual-width',`${viewport.width}px`);
  root.style.setProperty('--visual-height',`${viewport.height}px`);
}