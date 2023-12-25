import { Component, OnInit, ViewChild } from '@angular/core';
import { FunctionsService } from './functions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { CdkDragEnd, CdkDragStart, CdkDragMove } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-stickynotes',
  templateUrl: './stickynotes.component.html',
  styleUrls: ['./stickynotes.component.scss']
})
export class StickynotesComponent implements OnInit {

  @ViewChild('closebutton') closebutton:any;

  notes: any = [];
  users: any = [];
  user: any = {};
  errorMessage = '';
  isAdd: boolean = false;
  isSubmitted = false;
  isCatSubmitted = false;
  isUpdate:any = false;
  dropdownList: any = [];
  dropdownSettings: any = {};
  positionX:any;
  positionY:any;

  addForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    assignee: ['', [Validators.required]]
  });


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

    this.user = this.userSession.getUser();
    this.usersList();
    this.stickyNotes();

  }

  dragEnded(event: CdkDragEnd, id: any) {
    console.log(event.source.getFreeDragPosition());
    let position = event.source.getFreeDragPosition();
    this.changePostiont(id, position);
  }


  stickyNotes() {
    this.functions.list().subscribe({
      next: data => {
        this.notes = data.stickynotes;
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
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

  create(form: FormGroup): any {
    this.isSubmitted = true;
    if (form.invalid) {
      return false;
    } else {
      if(this.isUpdate) {
        this.functions.update(form.value, this.isUpdate).subscribe({
          next: data => {
            this.isSubmitted = false;
            console.log(data);
          },
          error: err => {
            this.isSubmitted = false;
            this.errorMessage = err.error.message;
          }
        });
      }else {
        this.functions.add(form.value).subscribe({
          next: data => {
            this.isSubmitted = false;
            this.stickyNotes();
            this.closebutton.nativeElement.click();

            this.addForm.reset();
            for (let control in this.addForm.controls) {
              this.addForm.controls[control].setErrors(null);
            }

          },
          error: err => {
            this.isSubmitted = false;
            this.errorMessage = err.error.message;
          }
        });
      }
      
    }
  }

  deleteNote(id: Number) {
    this.functions.delete(id).subscribe({
      next: data => {
        this.stickyNotes();
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }

  editNote(item: any) {
    item.expand = true;
  }

  changePostiont(id:any, position:any) {
    this.functions.position(id, position).subscribe({
      next: data => {
        // this.stickyNotes();
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }

  topPosition(position:any) {
    if(position) {
      return position.x;
    }
  }

  leftPosition(position:any) {
    if(position) {
      return position.y;
    }
  }


  get title(): any { return this.addForm.get('title'); }
  get description(): any { return this.addForm.get('description'); }
  get assignee(): any { return this.addForm.get('assignee'); }

}
