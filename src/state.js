export const state={
  pdf:null,
  pdfBytes:null,
  fileName:null,
  defaultScale:1.35,
  scale:1.35,
  minScale:0.75,
  maxScale:3,
  zoomStep:0.15,
  annotations:[],
  selectedCategory:0,
  categoryIndex:new Map(),
  navCurrentIdByCategory:new Map(),
  renderToken:0,
  clickStart:null,
  openCommentIds:new Set()
};