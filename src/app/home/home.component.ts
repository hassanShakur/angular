import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild('myForm') form: NgForm | undefined;
  constructor(private router: Router) {}

  onGoToUsers() {
    this.router.navigate(['users/testUser']);
  }

  // onSubmit(myForm: NgForm) {
  //   console.log(myForm);
  // }
  onSubmit(f: NgForm) {
    console.log(this.form);
  }
}
