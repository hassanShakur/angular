import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userName: string = '';
  constructor(private router: Router, private route: ActivatedRoute) {}

  paramsObserver = (params: Params) => {
    this.userName = params['userName'];
  };

  ngOnInit(): void {
    this.userName = this.route.snapshot.params['userName'];
  }

  goToUser(name: string) {
    this.router.navigate(['users', name], {queryParamsHandling: 'preserve'});

    this.route.params.subscribe(this.paramsObserver);
  }
}
