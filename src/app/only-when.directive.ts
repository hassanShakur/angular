import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appOnlyWhen]',
})
export class OnlyWhenDirective {
  // Use a setter
  @Input() set appOnlyWhen(condition: boolean) {
    if (condition) {
      // Add item to dom if condition is true
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      // Destroy all views in the container binded to
      this.vcRef.clear();
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {}
}
