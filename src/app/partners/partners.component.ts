import { Component, OnInit } from '@angular/core';
import { FunctionsService } from './functions.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from './../_services/token-storage.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  partners: any = [];
  users: any = [];
  user: any = {};

  constructor(
    private functions: FunctionsService,
    private router: Router,
    private userService: UserService,
    private userSession: TokenStorageService,
  ) { }

  ngOnInit() {
    this.partnersList();
    this.user = this.userSession.getUser();
  }

  partnersList() {
    this.functions.list().subscribe({
      next: data => {
        this.partners = data.partners;
        console.log(this.partners);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  addNew() {
    this.router.navigate(['/partners/create']);
  }

  viewPartner(id: Number) {
    this.router.navigate(['/partners/view', id]);
  }

}
