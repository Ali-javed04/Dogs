import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  AdminEmail:string = "sirdamazing@gmail.com"
  password:string = "portugal"

  constructor() { }
  public hasValidAuthenticationToken(): boolean {
    try {
      const authenticationToken = localStorage.getItem('authenticatedByLoginToken')
      return authenticationToken !== null
    } catch (err) {
      return false
    }
  }
  public ActiveUserEmail(): string {
    let a = localStorage.getItem('userData')
    let b  = JSON.parse(a)
    let c = b.email
    return c
  }
  public ActiveUserName(): string {
    let a = localStorage.getItem('userData')
    let b  = JSON.parse(a)
    let c = b.name
    return c
  }
  public ActivePhoneNumber(): string {
    let a = localStorage.getItem('userData')
    let b  = JSON.parse(a)
    let c = b.phoneNumber
    return c
  }

  public Admin():boolean {
    try {
      let a = localStorage.getItem('userData')
      let b  = JSON.parse(a)
      let c = b.email
      if(c == this.AdminEmail){
        return true
      }
      else {
        return false
      }
    } catch(err) {
      return false
    }


  }
  public getCurrentUserProfile() {
    let a  =localStorage.getItem('userData')
    let b  = JSON.parse(a)
    return b
  }
}
