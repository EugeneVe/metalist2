import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';

import {AuthService} from '../services/auth.service';
import {User} from '../model/user.interface';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})

export class NavbarComponent implements OnInit, OnDestroy {
  isCollapsed: Boolean;
  currentUser: User;
  isLoggedIn: Boolean;
  subscription: Subscription;

  constructor(private authenticationService: AuthService) {
    Observable.fromEvent(window, 'resize').map((event: any) => {
      // console.log(23, event.target.innerWidth);
      this.isCollapsed = event.target.innerWidth >= 960;
    }).subscribe();
  }

  ngOnInit() {
    this.subscription = this.authenticationService.user
      .subscribe(value => {
          this.currentUser = value;
          this.isLoggedIn = Boolean(value);
      });
    this.isCollapsed = window.innerWidth >= 960;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  toggleMenu = () => {
    this.isCollapsed = !this.isCollapsed;
  }
  isAdmin = () => this.authenticationService.isAdmin();

  isCashier = () => this.authenticationService.isCashier();
  get loggedInWithOauth () {
    return this.currentUser && this.currentUser.provider !== 'local';
  }

}
