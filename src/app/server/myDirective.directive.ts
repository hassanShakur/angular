import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[sampleDirective]',
})
class SampleDirective {
  constructor(private targetEl: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.targetEl.nativeElement, 'color', 'green');
  }
}

export default SampleDirective;
