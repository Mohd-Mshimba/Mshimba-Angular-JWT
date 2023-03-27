import { Router } from '@angular/router';
import { UserAuthService } from './../../auth/services/user-auth.service';
import { Component } from '@angular/core';
import { UserService } from 'src/app/auth/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

constructor(
  private router: Router,
  public userService:UserService,
  private userAuthService:UserAuthService){}

ngOnInit(): void {}

public isLoggedIn(){
  return this.userAuthService.isLoggedIn();
}

public logout(){
  return this.userAuthService.clear();
  this.router.navigate(['/home']);
}

}
