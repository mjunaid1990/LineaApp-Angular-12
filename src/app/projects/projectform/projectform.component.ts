import { Component, OnInit } from '@angular/core';
import { FunctionsService } from './../functions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../../_services/user.service';
import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'app-projectform',
  templateUrl: './projectform.component.html',
  styleUrls: ['./projectform.component.scss']
})
export class ProjectformComponent implements OnInit {

  users: any = [];
  user: any = {};
  errorMessage = '';
  isAdd: boolean = false;
  isSubmitted = false;
  isUpdate:any = false;
  dropdownList: any = [];
  dropdownSettings: any = {};

  addForm = this.fb.group({
    name: ['', [Validators.required]],
    assignee: ['', [Validators.required]],
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


    let projectid:any = this.route.snapshot.paramMap.get('id');
    if(projectid) {
      this.updateValue(projectid);
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
        let project = data.project;
        this.isUpdate = project.id;
        this.addForm.patchValue({
          name: project.name,
          assignee: JSON.parse(project.assignee),
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
            this.router.navigate(['/projects']);
          },
          error: err => {
            this.errorMessage = err.error.message;
          }
        });
      }
      
    }
  }

  get name(): any { return this.addForm.get('name'); }
  get assignee(): any { return this.addForm.get('assignee'); }

}
