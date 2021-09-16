import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currenturl: string = '';
  constructor(private router:Router,
    private localstorageService:LocalstorageService,
    private firebaseService:FirebaseService ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event:any) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
   if(event.url =='/') {
        this.currenturl = 'home'
      }else {
        this.currenturl = event.url
      }
    });
  }
  logOut() {
    this.firebaseService.logout()

  }
  currentState(url:string): boolean {
    return this.currenturl.includes(url)
   }
  public get hasValidAuthenticationToken(): boolean {
   return this.localstorageService.hasValidAuthenticationToken()
 }
 public get userName():string {
   return this.localstorageService.ActiveUserName()
 }
 public get hasAdmin():boolean {
   return this.localstorageService.Admin()
 }
}
