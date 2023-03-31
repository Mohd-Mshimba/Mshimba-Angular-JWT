import { UserAuthService } from './user-auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://localhost:8090';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(
    private httpClient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public forUser(){
    return this.httpClient.get(this.apiUrl+"/forUser",{
      responseType:'text'
    });
  }

  public forAdmin(){
    return this.httpClient.get(this.apiUrl+"/forAdmin",{
      responseType:'text'
    });
  }

  public login(loginData: any) {
    return this.httpClient.post(this.apiUrl + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }

  public roleMatch(allowedRole: string | any[]): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRole.length; j++) {
          if (userRoles[i].roleName === allowedRole[j]) {
            isMatch = true;
            break;
          }
        }
        if (isMatch) {
          break;
        }
      }
    }
    return isMatch;
  }
}
