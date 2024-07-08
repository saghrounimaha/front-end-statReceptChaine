import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
apiUrl="http://localhost:8080/api/v1/user"
  constructor(private http:HttpClient, private tokenService:TokenService) { 
  }


  login (loginRequest:any){
    return this.http.post(this.apiUrl + '/login', loginRequest);
  }

  public logout() {
    this.tokenService.removeToken();
    window.location.replace('/auth/signin-basic');
}
}
