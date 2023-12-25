import { Component, OnInit } from '@angular/core';
import { FunctionsService } from './../functions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../../_services/user.service';
import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  user: any = {};
  item: any = {};
  postID: any = null;
  constructor(
    private functions: FunctionsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private userSession: TokenStorageService,
  ) { }

  ngOnInit() {
    this.user = this.userSession.getUser();
    let feedid: any = this.route.snapshot.paramMap.get('id');
    if (feedid) {
      this.fetchDetail(feedid);
      this.postID = feedid;
    }
  }

  fetchDetail(id: Number) {
    this.functions.view(id).subscribe({
      next: data => {
        this.item = data.feed;
      },
      error: err => {

      }
    });
  }

  canEdit(ids:any, user_id:Number) {
    let found = false;
    if(user_id == this.user.id) {
      return true;
    }
    if(ids != undefined) {
      let assignee = ids;
      assignee.forEach((item:any) => {
        if(item.item_id == this.user.id) {
          found = true;
        }
      });
    }
    if(found) {
      return true;
    }
    return false;
  }

  editFeed(id:Number) {
    this.router.navigate(['/feeds/update', id]);
  }

  changeStatus(id:Number, status:string) {
    this.functions.changeStatus(id, status).subscribe({
      next: data => {
        this.fetchDetail(id);
      },
      error: err => {
        
      }
    });
  }

  deleteFeed(id:Number) {
    this.functions.delete(id).subscribe({
      next: data => {
        this.router.navigate(['/feeds']);
      },
      error: err => {
        
      }
    });
  }

  goBack() {
    this.router.navigate(['/feeds']);
  }

}
