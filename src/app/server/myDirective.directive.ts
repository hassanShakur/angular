import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[sampleDirective]',
})
class SampleDirective {
  constructor(private targetEl: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseenter') mouseHasEnter(e: Event) {
    this.renderer.setStyle(this.targetEl.nativeElement, 'background-color', 'green');
  }

  @HostListener('mouseleave') mouseHasLeft(e: Event) {
    this.renderer.setStyle(this.targetEl.nativeElement, 'background-color', 'transparent');
  }
}

export default SampleDirective;
