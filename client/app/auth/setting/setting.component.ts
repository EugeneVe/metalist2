import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';

import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {User} from "../../model/user.interface";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  user:User;
  message:string = '';
  settingsForm:FormGroup;

  constructor(private authService:AuthService, private formBuilder:FormBuilder, private userService:UserService) {

    this.settingsForm = formBuilder.group({
      currentPassword: new FormControl('', [
        Validators.required,
      ]),
      newPassword: new FormControl('', [
        Validators.required,
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
      ]),
    }, {validator: this.matchingPasswords('newPassword', 'confirmPassword')});
  }

  ngOnInit() {
  }

  changePassword() {
    const {currentPassword, newPassword} = this.settingsForm.value;
    this.userService.changePassword(this.authService.user.id, currentPassword, newPassword)
      .subscribe(
        () => this.message = 'Password was successfully updated',
        () => this.message = 'Something went wrong, please try again!')
  }

  private matchingPasswords(passwordKey:string, confirmPasswordKey:string) {
    return (group:FormGroup):{[key:string]:any} => {
      let newPassword = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
      if (!newPassword.value || !confirmPassword.value) {
        return;
      }
      if (newPassword.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }
}
