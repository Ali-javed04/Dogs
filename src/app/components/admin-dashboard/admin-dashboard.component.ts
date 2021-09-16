import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  userLists: any;
  DogDetailLists: any;
  selectedTab: number;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.getUserList()
  }

  getUserList() {
    this.firebaseService.getAdoptUserList().then((response:any)=>{
      console.log(response)
      this.userLists = response
      this.userLists  =this.userLists.map(x=>x.docId)
      console.log(this.userLists)

    }),(error)=>{
      console.log(error)
    }
  }
   getSpecificUserDogList(id,i) {
     this.selectedTab = i
    this.firebaseService.getSpecificUserDogList(id).then((response:any)=>{
      this.DogDetailLists = response.data
      console.log('a',this.DogDetailLists)


    }),(error)=>{
      console.log(error)
    }
  }
}
