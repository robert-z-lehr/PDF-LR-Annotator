import {categories} from '../categories.js';
import {state} from '../state.js';
import {PDFDocument,PDFName,PDFString} from '../pdflib.js';
import {toast} from './toast.js';
function hexToRgb01(hex){
  const value=hex.replace('#','');
  return [0,2,4].map(i=>parseInt(value.slice(i,i+2),16)/255);
}
export async function exportAnnotations(){
  if(!state.pdfBytes||!state.annotations.length)return;
  const button=document.getElementById('saveBtn');
  const originalLabel=button.textContent;
  try{
    button.disabled=true;
    button.textContent='Building PDF…';
    const pdfDoc=await PDFDocument.load(state.pdfBytes,{ignoreEncryption:false});
    const pages=pdfDoc.getPages();
    for(const annotation of state.annotations){
      const page=pages[annotation.page-1];
      if(!page)continue;
      const crop=page.getCropBox();
      const category=categories[annotation.category];
      const [r,g,b]=hexToRgb01(category.color);
      const quadPoints=[];
      const pdfRects=annotation.rects.map(rect=>{
        const x1=crop.x+rect.x*crop.width;
        const x2=crop.x+(rect.x+rect.w)*crop.width;
        const yTop=crop.y+crop.height-rect.y*crop.height;
        const yBottom=crop.y+crop.height-(rect.y+rect.h)*crop.height;
        quadPoints.push(x1,yTop,x2,yTop,x1,yBottom,x2,yBottom);
        return {x1,x2,yTop,yBottom};
      });
      if(!pdfRects.length)continue;
      const left=Math.min(...pdfRects.map(rect=>rect.x1));
      const right=Math.max(...pdfRects.map(rect=>rect.x2));
      const bottom=Math.min(...pdfRects.map(rect=>rect.yBottom));
      const top=Math.max(...pdfRects.map(rect=>rect.yTop));
      const dict=pdfDoc.context.obj({
        Type:PDFName.of('Annot'),
        Subtype:PDFName.of('Highlight'),
        Rect:[left,bottom,right,top],
        QuadPoints:quadPoints,
        C:[r,g,b],
        CA:0.32,
        F:4,
        T:PDFString.of(category.name),
        Subj:PDFString.of(category.name),
        Contents:PDFString.of(annotation.comment?.trim()||category.name),
        NM:PDFString.of(annotation.id)
      });
      const ref=pdfDoc.context.register(dict);
      let annots=page.node.lookup(PDFName.of('Annots'));
      if(!annots){
        annots=pdfDoc.context.obj([]);
        page.node.set(PDFName.of('Annots'),annots);
      }
      annots.push(ref);
    }
    const bytes=await pdfDoc.save();
    const blob=new Blob([bytes],{type:'application/pdf'});
    const url=URL.createObjectURL(blob);
    const link=document.createElement('a');
    link.href=url;
    link.download=`${(state.fileName||'document').replace(/\.pdf$/i,'')}-annotated.pdf`;
    link.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    toast('Annotated PDF downloaded.');
  }catch(error){
    console.error(error);
    toast('Could not build annotated PDF.');
  }finally{
    button.textContent=originalLabel;
    button.disabled=!state.annotations.length;
  }
}