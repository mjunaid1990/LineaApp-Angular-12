import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  isSubmitted = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    this.isSubmitted = true;
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: data => {
        if(data.status == 200) {
          this.tokenStorage.saveToken(data.access_token);
          this.tokenStorage.saveUser(data.user);
  
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.router.navigate(['/app']);
        }else {
          this.errorMessage = data.message;
          this.isLoginFailed = true;
          this.isSubmitted = false;
        }
        
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.isSubmitted = false;
      }
    });
  }

}
