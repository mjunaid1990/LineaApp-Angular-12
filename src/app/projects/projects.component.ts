import { Component, OnInit } from '@angular/core';
import { FunctionsService } from './functions.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../_services/user.service';
import { TokenStorageService } from './../_services/token-storage.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: any = [];
  users: any = [];
  user: any = {};
  errorMessage = '';
  isAdd: boolean = false;
  isSubmitted = false;
  dropdownList: any = [];
  dropdownSettings: any = {};



  addForm = this.fb.group({
    name: ['', [Validators.required]],
    assignee: ['', [Validators.required]],
  })

  constructor(
    private functions: FunctionsService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private userSession: TokenStorageService,
  ) { }

  ngOnInit() {
    this.projectsList();
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
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  projectsList() {
    this.functions.list().subscribe({
      next: data => {
        this.projects = data.projects;
        console.log(this.projects);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  create(form: FormGroup): any {
    this.isSubmitted = true;
    if (form.invalid) {
      return false;
    } else {
      this.functions.add(form.value).subscribe({
        next: data => {
          this.isSubmitted = false;
          this.projectsList();
        },
        error: err => {
          this.errorMessage = err.error.message;
        }
      });
    }
  }

  addNew() {
    this.router.navigate(['/projects/create']);
  }

  canEdit() {
    if (this.user.type == 1) {
      return true;
    }
    return false;
  }

  editProject(id: Number) {
    this.router.navigate(['/projects/update', id]);
  }

  viewProject(id: Number) {
    this.router.navigate(['/projects/view', id]);
  }

  deleteProject(id: Number) {
    this.functions.delete(id).subscribe({
      next: data => {
        this.projectsList();
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }

  expandRow(item:any) {
    item.expand = !item.expand;
  }

  userChecked(id: Number) {
    this.functions.taskDoneByUser(id).subscribe({
      next: data => {
        this.projectsList();
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }

  adminChecked(id: Number) {
    this.functions.taskDoneByAdmin(id).subscribe({
      next: data => {
        this.projectsList();
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }

  get name(): any { return this.addForm.get('title'); }
  get assignee(): any { return this.addForm.get('assignee'); }

}
