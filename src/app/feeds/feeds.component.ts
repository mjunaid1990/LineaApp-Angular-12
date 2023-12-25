import { Component, OnInit } from '@angular/core';
import { FunctionsService } from './functions.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../_services/user.service';
import { TokenStorageService } from './../_services/token-storage.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent {
  
  feeds:any = [];
  users:any = [];
  user: any = {};
  errorMessage = '';
  isAdd: boolean =  false;
  isSubmitted = false;
  dropdownList: any = [];
  dropdownSettings: any = {};

  

  addForm = this.fb.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
    completion_date: ['', [Validators.required]],
    assigned_id: ['', [Validators.required]],
    status: ['Active',[]]
  })

  constructor(
              private functions: FunctionsService, 
              private router: Router, 
              private fb: FormBuilder,
              private userService: UserService,
              private userSession: TokenStorageService,
            ) 
    { }

  ngOnInit() {
    this.feedsList();
    this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
    };
    this.user = this.userSession.getUser();
    console.log(this.user);
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  feedsList() {
    this.functions.list().subscribe({
      next: data => {
        this.feeds = data.feeds;
        console.log(this.feeds);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  create(form: FormGroup): any {
    this.isSubmitted = true;
    console.log(form);
    if(form.invalid) {
      return false;
    }else {
      this.functions.add(form.value).subscribe({
        next: data => {
          this.isSubmitted = false;
          this.feedsList();
        },
        error: err => {
          this.errorMessage = err.error.message;
        }
      });
    }
  }

  addNew() {
    this.router.navigate(['/feeds/create']);
  }

  canEdit(ids:any, user_id:Number) {
    let assignee = JSON.parse(ids);
    let found = false;

    if(user_id == this.user.id) {
      return true;
    }
    assignee.forEach((item:any) => {
      if(item.item_id == this.user.id) {
        found = true;
      }
    });
    if(found) {
      return true;
    }
    return false;
  }

  changeStatus(id:Number, status:string) {
    this.functions.changeStatus(id, status).subscribe({
      next: data => {
        this.feedsList();
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }

  editFeed(id:Number) {
    this.router.navigate(['/feeds/update', id]);
  }

  viewFeed(id:Number) {
    this.router.navigate(['/feeds/view', id]);
  }

  deleteFeed(id:Number) {
    this.functions.delete(id).subscribe({
      next: data => {
        this.feedsList();
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }

  get title():any { return this.addForm.get('title'); }
  get content():any { return this.addForm.get('content'); }
  get completion_date():any { return this.addForm.get('completion_date'); }
  get assigned_id():any { return this.addForm.get('assigned_id'); }


}
