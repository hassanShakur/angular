import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
})
export class ServerComponent {
  data = 'Component data';
  counter = 0;

  startCounter() {
    setInterval(() => {
      this.counter++;
    }, 1000);
  }

  constructor() {
    this.counter = 1;
    this.startCounter()
  }
}
