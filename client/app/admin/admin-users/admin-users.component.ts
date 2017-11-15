import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminUsersComponent implements OnInit {

  users: any;

  constructor( private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  // setRole(user, role) {
  //   if (user.role != role) {
  //     this.userService.setRole({id: user.id, role: role})
  //       .$promise.then(() => this.getUsers());
  //   }
  // }

}
