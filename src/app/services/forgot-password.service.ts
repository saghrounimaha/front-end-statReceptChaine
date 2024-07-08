import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
apiUrl="http://localhost:8080/api/v1/reset-password"

  constructor(private http:HttpClient) {
   }

   resetPassword(ForgotPasswordRequest:any){
    return this.http.post(this.apiUrl+'/reset',ForgotPasswordRequest)
   }

   public sendToken(email: string) {
    const params = new HttpParams().set('email', email);
    return this.http.post<any>(this.apiUrl + "/send-token", params );
}

   verifyToken(ForgotPasswordRequest:any){
    return this.http.post(this.apiUrl+'/verify-token',ForgotPasswordRequest)
   }
}
