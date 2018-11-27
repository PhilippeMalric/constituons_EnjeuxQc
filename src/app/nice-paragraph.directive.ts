import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNiceParagraph]'
})
@HostListener('window:resize')

export class NiceParagraphDirective {

  currentWindowWidth:Number = null


  constructor(elementr: ElementRef) {
    

    this.currentWindowWidth = window.innerWidth;
    if (this.currentWindowWidth < 768) {
      elementr.nativeElement.style.textAlign = 'left';
    }
    else {
      elementr.nativeElement.style.textAlign = 'justify';
    }

  }

}
