import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FeedsComponent } from './feeds/feeds.component';
import { FormComponent } from './feeds/form/form.component';
import { ViewComponent } from './feeds/view/view.component';

import { ProjectsComponent } from './projects/projects.component';
import { ProjectformComponent } from './projects/projectform/projectform.component';
import { ProjectviewComponent } from './projects/projectview/projectview.component';

import { PartnersComponent } from './partners/partners.component';
import { PartnerformComponent } from './partners/partnerform/partnerform.component';
import { PartnerviewComponent } from './partners/partnerview/partnerview.component';

import { StickynotesComponent } from './stickynotes/stickynotes.component';

import { AttendenceComponent } from './attendence/attendence.component';
import { AttendenceviewComponent } from './attendence/attendenceview/attendenceview.component';

import { AuthGuard } from './_helpers/auth.guard';
import { SecureInnerPagesGuard } from './_helpers/secure-inner-pages.guard';

const routes: Routes = [

  
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [SecureInnerPagesGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [SecureInnerPagesGuard],
  },
  {
    path: 'app',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'feeds',
    component: FeedsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'feeds/create',
    component: FormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'feeds/update/:id',
    component: FormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'feeds/view/:id',
    component: ViewComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'projects/create',
    component: ProjectformComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'projects/update/:id',
    component: ProjectformComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'projects/view/:id',
    component: ProjectviewComponent,
    canActivate: [AuthGuard],
  },


  {
    path: 'partners',
    component: PartnersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'partners/create',
    component: PartnerformComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'partners/update/:id',
    component: PartnerformComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'partners/view/:id',
    component: PartnerviewComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'sticky-notes',
    component: StickynotesComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'attendence',
    component: AttendenceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'attendence/view/:id',
    component: AttendenceviewComponent,
    canActivate: [AuthGuard],
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'app', component: HomeComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }