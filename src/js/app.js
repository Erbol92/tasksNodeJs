import { Widget } from "./widget/widget.js";

document.addEventListener("DOMContentLoaded", () => {
  const widget = new Widget(document.querySelector("div.widget"));
  window.widget = widget;
  
  widget._element.addEventListener('keydown',(e)=>{
    if (e.key === 'Enter') {
      widget._addTask()
    } else {
      widget._filterTask()
    }
  })
  widget._element.addEventListener('keyup',(e)=>{
      widget._filterTask()
  })
});
