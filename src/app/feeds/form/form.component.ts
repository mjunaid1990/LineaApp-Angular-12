import { Component, OnInit } from '@angular/core';
import { FunctionsService } from './../functions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../../_services/user.service';
import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  users: any = [];
  user: any = {};
  errorMessage = '';
  isAdd: boolean = false;
  isSubmitted = false;
  isUpdate:any = false;
  dropdownList: any = [];
  dropdownSettings: any = {};

  addForm = this.fb.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
    completion_date: ['', [Validators.required]],
    assigned_id: ['', [Validators.required]],
    status: ['Active', []]
  })

  constructor(
    private functions: FunctionsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private userSession: TokenStorageService,
  ) { }

  ngOnInit() {

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.usersList();

    this.user = this.userSession.getUser();


    let feedid:any = this.route.snapshot.paramMap.get('id');
    if(feedid) {
      this.updateValue(feedid);
    }

  }

  usersList() {
    this.userService.dropdownList().subscribe({
      next: data => {
        this.dropdownList = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  updateValue(id:Number) {
    this.functions.view(id).subscribe({
      next: data => {
        let feed = data.feed;
        this.isUpdate = feed.id;
        this.addForm.patchValue({
          title: feed.title,
          completion_date: feed.completion_date,
          status: feed.status,
          assigned_id: JSON.parse(feed.assigned_id),
          content: feed.content
       });
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  create(form: FormGroup): any {
    this.isSubmitted = true;
    console.log(form);
    if (form.invalid) {
      return false;
    } else {
      if(this.isUpdate) {
        this.functions.update(form.value, this.isUpdate).subscribe({
          next: data => {
            console.log(data);
          },
          error: err => {
            this.errorMessage = err.error.message;
          }
        });
      }else {
        this.functions.add(form.value).subscribe({
          next: data => {
            this.router.navigate(['/feeds']);
          },
          error: err => {
            this.errorMessage = err.error.message;
          }
        });
      }
      
    }
  }

  get title(): any { return this.addForm.get('title'); }
  get content(): any { return this.addForm.get('content'); }
  get completion_date(): any { return this.addForm.get('completion_date'); }
  get assigned_id(): any { return this.addForm.get('assigned_id'); }

}
