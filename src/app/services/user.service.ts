import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http: any;
  apiUrl= "http://localhost:8080/api/v1/user";

  constructor() { }

   getByEmail(email: string) {
    //const trimmedAndEncodedEmail = encodeURIComponent(email.trim());
    const params = new HttpParams().set('email', email);
    return this.http.get(this.apiUrl + "/by-email", { params });
}

 updateUserData(user: any, id: number) {
    return this.http.put(this.apiUrl + "/" + id, user);
}

getUserByUsername(username: string) {
  return this.http.get(`${this.apiUrl}/username/${username}`);
}
}
