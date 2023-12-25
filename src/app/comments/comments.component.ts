import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FunctionsService } from './functions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() postid?: any;
  @ViewChild("contentfield") contentfield:any;

  user: any = {};
  comments: any = {};
  errorMessage = '';
  isSubmitted = false;
  isUpdate: any = false;

  addForm = this.fb.group({
    content: ['', [Validators.required]],
    post_id: [''],
    parent_id: ['']
  });


  constructor(
    private functions: FunctionsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private userSession: TokenStorageService,
  ) { }

  ngOnInit(): void {
    if(this.postid != undefined) {
      this.fetchList(this.postid);
    }
  }

  fetchList(id: Number) {
    this.functions.list(id).subscribe({
      next: data => {
        this.comments = data;
      },
      error: err => {

      }
    });
  }

  create(form: FormGroup): any {
    this.isSubmitted = true;
    if (form.invalid) {
      return false;
    } else {

      

      if(this.isUpdate) {

        this.addForm.patchValue({
          post_id: this.postid,
          parent_id: this.isUpdate
        });

        this.functions.add(form.value).subscribe({
          next: data => {
              this.isSubmitted = false;
              this.addForm.reset();
              for (let control in this.addForm.controls) {
                this.addForm.controls[control].setErrors(null);
              }
              this.fetchList(this.postid);
          },
          error: err => {
            this.errorMessage = err.error.message;
          }
        });

      }else {

        this.addForm.patchValue({
          post_id: this.postid
        });

        this.functions.add(form.value).subscribe({
          next: data => {
              this.isSubmitted = false;
              this.addForm.reset();
              for (let control in this.addForm.controls) {
                this.addForm.controls[control].setErrors(null);
              }
              this.fetchList(this.postid);
          },
          error: err => {
            this.errorMessage = err.error.message;
          }
        });
        
      }

      

    }
  }

  reply(id: Number) {
    this.isUpdate = id;
    console.log(this.isUpdate);
    this.contentfield.nativeElement.focus();
  }

  childReply(eventData:any) {
    this.isUpdate = eventData;
    console.log(eventData);
    this.contentfield.nativeElement.focus();
  }

  get content(): any { return this.addForm.get('content'); }

}
