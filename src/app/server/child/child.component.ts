import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent {
  @Output() createChildData = new EventEmitter<string>();

  constructor() {
    setTimeout(() => {
      this.createChildData.emit('Data from child');
    }, 2000);
  }
}
