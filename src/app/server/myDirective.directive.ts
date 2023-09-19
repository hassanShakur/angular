import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[sampleDirective]',
})
class SampleDirective {
  constructor(targetEl: ElementRef) {
    targetEl.nativeElement.style.color = 'red';
  }
}

export default SampleDirective;
