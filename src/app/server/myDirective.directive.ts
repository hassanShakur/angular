import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: '[sampleDirective]',
})
class SampleDirective {
  @HostBinding('style.backgroundColor') bg: string = 'white';

  @HostListener('mouseenter') mouseHasEnter(e: Event) {
    this.bg = 'green';
  }

  @HostListener('mouseleave') mouseHasLeft(e: Event) {
    this.bg = 'transparent';
  }
}

export default SampleDirective;
