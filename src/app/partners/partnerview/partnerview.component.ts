import { Component, OnInit } from '@angular/core';
import { FunctionsService } from './../functions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from './../../_services/token-storage.service';
@Component({
  selector: 'app-partnerview',
  templateUrl: './partnerview.component.html',
  styleUrls: ['./partnerview.component.scss']
})
export class PartnerviewComponent implements OnInit {

  partner: any = [];
  user: any = {};
  postID: any = null;

  constructor(
    private functions: FunctionsService,
    private router: Router,
    private route: ActivatedRoute,
    private userSession: TokenStorageService,
  ) { }

  ngOnInit() {
    let partnerID: any = this.route.snapshot.paramMap.get('id');
    if (partnerID) {
      this.getPartner(partnerID);
      this.postID = partnerID;
    }
    this.user = this.userSession.getUser();
  }

  getPartner(id: Number) {
    this.functions.view(id).subscribe({
      next: data => {
        this.partner = data.partner;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/partners']);
  }

}
