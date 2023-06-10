import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { AppUser } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  users: AppUser[]=[];
  authenticatedUser: AppUser | undefined;

  constructor() {
    this.users.push({userId:UUID.UUID(), username:'user1', password:'1234', roles:['USER']});
    this.users.push({userId:UUID.UUID(), username:'user2', password:'1234', roles:['ADMIN']});
    this.users.push({userId:UUID.UUID(), username:'admin', password:'4567', roles:['ADMIN', 'USER']});
   }

   public login(username: string, password: string):Observable<AppUser>{
      let appUser = this.users.find(u => u.username == username);
      if(!appUser){
        return throwError(()=>new Error("Bad credential"));
      }
      if(appUser.password!= password){
        return throwError(()=>new Error("Bad credential"));
      }
      return of(appUser);
   }

  public authenticateUser(appUser: AppUser):Observable<boolean>{
    this.authenticatedUser = appUser;
    localStorage.setItem("authUser", JSON.stringify({username: appUser.username, role:appUser.roles, jwt:"JWT_TOKEN"}));
    return of(true)
  }


  public hasRole(role: string):boolean{
    return this.authenticatedUser!.roles.includes(role);
  }

  public isAuthenticated(){
    return this.authenticatedUser!= undefined;
  }

  public logout(): Observable<boolean>{
    this.authenticatedUser = undefined;
    localStorage.removeItem("authUser")
    return of(true)

  }

}
