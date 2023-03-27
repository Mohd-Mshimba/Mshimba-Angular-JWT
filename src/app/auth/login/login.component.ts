import { SwalService } from './../../shared/swal.service';
import { UserService } from './../services/user.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private swalService: SwalService,
    private spinner: NgxSpinnerService,
    private userServices: UserService,
    private userAuthService: UserAuthService,
    private router:Router
  ) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    this.spinner.show();
    this.userServices.login(loginForm.value).subscribe({
      next: (res: any) => {
        this.userAuthService.setRoles(res.user.role);
        this.userAuthService.setToken(res.jwtToken);

        const role = res.user.role[0];
        if (role==='Admin') {
          this.router.navigate(['/admin']);
        }else{
          this.router.navigate(['/user']);
        }

      },error: (error: any) => {
        this.spinner.hide();
        const errorMsg = 'Fail to LogIn';
        this.swalService.errorNotification(errorMsg);
      },
      complete: () => this.spinner.hide(),
    });
  }
}
