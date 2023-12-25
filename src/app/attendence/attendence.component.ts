import { Component, OnInit } from '@angular/core';
import { FunctionsService } from './functions.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from './../_services/token-storage.service';
@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.scss']
})
export class AttendenceComponent implements OnInit {

  attendences: any = [];
  users: any = [];
  user: any = {};

  constructor(
    private functions: FunctionsService,
    private router: Router,
    private userService: UserService,
    private userSession: TokenStorageService,
  ) { }

  ngOnInit() {
    this.userList();
    this.user = this.userSession.getUser();
  }


  userList() {
    this.functions.usersList().subscribe({
      next: data => {
        this.users = data.users;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  canEdit(id:any) {
    if(id == this.user.id) {
      return true;
    }
    return false;
  }

  changeStatus(userid:any, type: any, status:any) {
    if(status) {
      this.functions.update({user_id:userid, type:type}, status).subscribe({
        next: data => {
          this.userList();
        },
        error: err => {
          console.log(err);
        }
      });
      
    }else {
      this.functions.add({user_id:userid, type:type}).subscribe({
        next: data => {
          this.userList();
        },
        error: err => {
          console.log(err);
        }
      });
    }
    
  }

}
