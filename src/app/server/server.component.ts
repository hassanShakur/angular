import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
})
export class ServerComponent {
  kidData = ''

  childDataCreated(kidData: string) {
    this.kidData = kidData;
  }
}
