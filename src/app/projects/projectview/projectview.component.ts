import { Component, OnInit } from '@angular/core';
import { FunctionsService } from './../functions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../../_services/user.service';
import { TokenStorageService } from '../../_services/token-storage.service';
@Component({
  selector: 'app-projectview',
  templateUrl: './projectview.component.html',
  styleUrls: ['./projectview.component.scss']
})
export class ProjectviewComponent implements OnInit {


  user: any = {};
  errorMessage = '';
  isAdd: boolean = false;
  isSubmitted = false;
  isUpdate: any = false;
  project: any = {};
  title: string = '';
  projectID:any;

  addForm = this.fb.group({
    name: ['', [Validators.required]],
    frequency: ['', [Validators.required]],
    task_id: [''],
    id: ['']
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


    this.user = this.userSession.getUser();


    let projectid: any = this.route.snapshot.paramMap.get('id');
    if(projectid) {
      this.projectID = projectid;
      this.fetchProject(projectid);
    }

  }


  updateValue(id: Number) {
    this.functions.getTask(id).subscribe({
      next: data => {
        let task = data.tasklist;
        this.isUpdate = task.id;
        this.addForm.patchValue({
          name: task.name,
          frequency: task.frequency,
        });
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }

  fetchProject(id:Number) {
    this.functions.view(id).subscribe({
      next: data => {
        this.project = data.project;
        this.title = this.project.name;
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }


  create(form: FormGroup): any {

    this.addForm.patchValue({
      task_id: this.projectID
    });

    this.isSubmitted = true;
    if (form.invalid) {
      return false;
    } else {
      if (this.isUpdate) {
        this.functions.taskUpdate(form.value, this.isUpdate).subscribe({
          next: data => {
            this.fetchProject(this.projectID);
            this.onClear();
            this.isSubmitted = false;
          },
          error: err => {
            this.errorMessage = err.error.message;
          }
        });
      } else {
        this.functions.taskAdd(form.value).subscribe({
          next: data => {
              this.fetchProject(this.projectID);
              this.onClear();
              this.isSubmitted = false;
          },
          error: err => {
            this.errorMessage = err.error.message;
          }
        });
      }

    }
  }

  userChecked(id: Number) {
    this.functions.taskDoneByUser(id).subscribe({
      next: data => {
          this.fetchProject(this.projectID);
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }

  adminChecked(id: Number) {
    this.functions.taskDoneByAdmin(id).subscribe({
      next: data => {
          this.fetchProject(this.projectID);
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }

  editTask(id: Number) {
    this.updateValue(id);
  }

  deleteTask(id: Number) {
    this.functions.taskDelete(id).subscribe({
      next: data => {
          this.fetchProject(this.projectID);
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }

  onClear() {
    this.isUpdate = false;
    this.addForm.reset();
    for (let control in this.addForm.controls) {
      this.addForm.controls[control].setErrors(null);
    }
 }

  get name(): any { return this.addForm.get('name'); }
  get frequency(): any { return this.addForm.get('frequency'); }

}
