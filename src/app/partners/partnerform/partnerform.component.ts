import { Component, OnInit, ViewChild } from '@angular/core';
import { FunctionsService } from './../functions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../../_services/user.service';
import { TokenStorageService } from '../../_services/token-storage.service';
@Component({
  selector: 'app-partnerform',
  templateUrl: './partnerform.component.html',
  styleUrls: ['./partnerform.component.scss']
})
export class PartnerformComponent implements OnInit {

  @ViewChild('closebutton') closebutton:any;

  users: any = [];
  user: any = {};
  categories: any = [];
  errorMessage = '';
  isAdd: boolean = false;
  isSubmitted = false;
  isCatSubmitted = false;
  isUpdate:any = false;

  addForm = this.fb.group({
    name: ['', [Validators.required]],
    category_id: ['', [Validators.required]],
    reputation: ['', [Validators.required]],
    active_duration: ['', [Validators.required]],
    trustability: ['', [Validators.required]],
    fulfillment_of_commitments: ['', [Validators.required]],
    service_on_time: ['', [Validators.required]],
    risk_of_issues_arising: ['', [Validators.required]],
    service_as_described: ['', [Validators.required]],
    level_of_customer_care: ['', [Validators.required]],
    staff_attitude: ['', [Validators.required]]
  });

  categoryForm = this.fb.group({
    name: ['', [Validators.required]]
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
    this.categoriesList();

    let partnerid:any = this.route.snapshot.paramMap.get('id');
    if(partnerid) {
      this.updateValue(partnerid);
    }

  }

  categoriesList() {
    this.functions.categoryList().subscribe({
      next: data => {
        this.categories = data.categories;
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }

  updateValue(id:Number) {
    this.functions.view(id).subscribe({
      next: data => {
        let partner = data.partner;
        this.isUpdate = partner.id;
        this.addForm.patchValue({
          name: partner.name,
          category_id: partner.category_id,
          reputation: partner.reputation,
          active_duration: partner.active_duration,
          trustability: partner.trustability,
          fulfillment_of_commitments: partner.fulfillment_of_commitments,
          service_on_time: partner.service_on_time,
          risk_of_issues_arising: partner.risk_of_issues_arising,
          service_as_described: partner.service_as_described,
          level_of_customer_care: partner.level_of_customer_care,
          staff_attitude: partner.staff_attitude
       });
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
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
            this.router.navigate(['/partners']);
          },
          error: err => {
            this.isSubmitted = false;
            this.errorMessage = err.error.message;
          }
        });
      }
      
    }
  }

  createCategory(form: FormGroup): any {
    this.isCatSubmitted = true;
    if (form.invalid) {
      return false;
    } else {
      this.functions.categoryAdd(form.value).subscribe({
        next: data => {
          this.isCatSubmitted = false;
          this.categoriesList();
          this.closebutton.nativeElement.click();

          this.categoryForm.reset();
          for (let control in this.categoryForm.controls) {
            this.addForm.controls[control].setErrors(null);
          }

        },
        error: err => {
          this.isCatSubmitted = false;
          this.errorMessage = err.error.message;
        }
      });
      
    }
  }

  onSave() {

  }

  get name(): any { return this.addForm.get('name'); }
  get reputation(): any { return this.addForm.get('reputation'); }
  get active_duration(): any { return this.addForm.get('active_duration'); }
  get trustability(): any { return this.addForm.get('trustability'); }
  get fulfillment_of_commitments(): any { return this.addForm.get('fulfillment_of_commitments'); }
  get service_on_time(): any { return this.addForm.get('service_on_time'); }
  get risk_of_issues_arising(): any { return this.addForm.get('risk_of_issues_arising'); }
  get service_as_described(): any { return this.addForm.get('service_as_described'); }
  get level_of_customer_care(): any { return this.addForm.get('level_of_customer_care'); }
  get staff_attitude(): any { return this.addForm.get('staff_attitude'); }
  get category(): any { return this.addForm.get('category_id'); }

  get category_name(): any { return this.categoryForm.get('name'); }


}
