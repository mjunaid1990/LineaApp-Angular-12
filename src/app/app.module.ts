import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { TokenStorageService } from './_services/token-storage.service';
import { FeedsComponent } from './feeds/feeds.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormComponent } from './feeds/form/form.component';
import { ViewComponent } from './feeds/view/view.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectformComponent } from './projects/projectform/projectform.component';
import { ProjectviewComponent } from './projects/projectview/projectview.component';
import { PartnersComponent } from './partners/partners.component';
import { PartnerformComponent } from './partners/partnerform/partnerform.component';
import { PartnerviewComponent } from './partners/partnerview/partnerview.component';
import { StickynotesComponent } from './stickynotes/stickynotes.component';
import { CommentsComponent } from './comments/comments.component';
import { ReplyComponent } from './comments/reply.component';
import { AttendenceComponent } from './attendence/attendence.component';
import { AttendenceviewComponent } from './attendence/attendenceview/attendenceview.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FeedsComponent,
    FormComponent,
    ViewComponent,
    ProjectsComponent,
    ProjectformComponent,
    ProjectviewComponent,
    PartnersComponent,
    PartnerformComponent,
    PartnerviewComponent,
    StickynotesComponent,
    CommentsComponent,
    ReplyComponent,
    AttendenceComponent,
    AttendenceviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule,
    DragDropModule
  ],
  providers: [authInterceptorProviders, TokenStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }