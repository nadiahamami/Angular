import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL= environment.baseURL
  constructor(private http: HttpClient) { }

  getAllUsers(){
    return this.http.get(`${this.baseURL}/users/`);
  }

  addUser(userData: any){
    return this.http.post(`${this.baseURL}/users/`, userData);
  }

  getUser(id: any){
    return this.http.get(`${this.baseURL}/users/${id}`);
  }

  updateUser(id: any, userData: any){
    return this.http.put(`${this.baseURL}/users/${id}`, userData);
  }

  deletUser(id: any){
    return this.http.delete(`${this.baseURL}/users/${id}`);
  }

  getProfile(){
    return this.http.get(`${this.baseURL}/profile`);
  }

  updateProfile(userData: any){
    return this.http.put(`${this.baseURL}/profile`, userData);
  }

  uploadAvatar(formData: any){
    return this.http.post(`${this.baseURL}/files/upload`, formData);
  }

  getRoles(){
    return this.http.get(`${this.baseURL}/users/roles`);
  }
}
