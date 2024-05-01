import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http=inject(HttpClient)
  apiUrl:string='http://localhost:3000'

  private currenttheme:'light' | 'dark' ='light'

constructor() { }

setCurrentTheme(theme:'light' | 'dark'){
  this.currenttheme = theme
  document.body.classList.toggle('theme-dark',theme== 'dark')
}

getcurrentTheme():'light' | 'dark'{
  return this.currenttheme;
}





checkEmail(email:string):Observable<object>{
  return this.http.post(this.apiUrl+'/verifyEmail',{email:email});
}


login(email:string,password:string):Observable<object>{
  return this.http.post(this.apiUrl+'/loginUser',{email:email,password:password});
}

signUp(username:string,email:string,password:string):Observable<object>{
  return this.http.post(this.apiUrl+'/registerUser',{username:username,email:email,password:password});
}

getAllUsers():Observable<object>{
return this.http.get(this.apiUrl+'/getAllUsers');
}
}
