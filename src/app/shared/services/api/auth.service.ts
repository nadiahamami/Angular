import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as crypto from 'crypto-js';
import jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL= environment.baseURL
  constructor(private http: HttpClient) {
    this.getAuthentificatedUserId();
   }

  login(userCredential: any){
    return this.http.post(`${this.baseURL}/auth/login`, userCredential);
  }

  forgotPassword(userCredential: any){
    return this.http.post(`${this.baseURL}/forgot-password`, userCredential);
  }
  
  resetPassword(userCredential: any){
    return this.http.post(`${this.baseURL}/reset-password`, userCredential);
  }

  // encrypt the token and set it in the localStorage
  setToken(token : string) {
    const cipherToken = crypto.AES.encrypt(token, 'ascefb');
    localStorage.setItem('token', cipherToken.toString());
  }

  // decypted the token and get his value from localStorage
  getToken() {
    const token = localStorage.getItem('token');
    if (token !== null && token !== undefined) {
      const decyptedToken = crypto.AES.decrypt(token.toString(), 'ascefb').toString(crypto.enc.Utf8);
      return decyptedToken;
    } else {
      return token;
    }
  }

  isAuthentificated(): boolean {
    const token = this.getToken();
    if (token) {
      const isexpired = this.isExpiredToken(token)
      if (!isexpired) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  
  isExpiredToken(token: string): boolean {
    const decoded:any= jwt_decode(token);
    return Math.floor(new Date().getTime()/1000)>=decoded.exp
  }


  getRole()
  {
    const token = this.getToken();
    if(token){
      const decoded:any= jwt_decode(token);
      if(decoded.authorities.length>0)
      {
        const firstRole = decoded.authorities[0]?.authority;
        return firstRole;
      }else {
        return null;
      }
      
    }else {
      return null;
    }
  }

  getAuthentificatedUserId(){
    const token = this.getToken();
    if(token){
      const decoded:any= jwt_decode(token);
      if(decoded.sub)
      {
        const userId = decoded.sub;
        console.log(userId)
        return userId;
      }else {
        return null;
      }
      
    }else {
      return null;
    }
  }

}
