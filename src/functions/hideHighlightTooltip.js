export function hideHighlightTooltip(element){
  clearTimeout(element?._tooltipTimer);
  const tooltip=document.getElementById('highlightTooltip');
  if(tooltip)tooltip.classList.remove('show');
}