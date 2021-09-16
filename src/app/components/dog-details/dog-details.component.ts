import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DogDetailsService } from 'src/app/services/dog-details.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrls: ['./dog-details.component.scss']
})
export class DogDetailsComponent implements OnInit {
  dogId:any
  selectedDogDetails: any;
  selectedBreedFor:any;
  registerForm: FormGroup;
  submitted = false;
  selectedDogID: number;
  alreadyapply: boolean;
  constructor(private dogDetailService:DogDetailsService,
    private router: Router,
    private activeroute:ActivatedRoute,
    private ngxService: NgxUiLoaderService,
    private formBuilder: FormBuilder,
    private localstorageService:LocalstorageService,
    private firebaseService:FirebaseService,
    private toaster:ToastrService) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {

    this.dogId = this.activeroute.snapshot.paramMap.get('id');
    this.getDogDetail()
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      phoneNumber: ['', [Validators.required]],
  })

  }
  get f() { return this.registerForm.controls; }

onSubmit() {
  this.submitted = true;
  if (this.registerForm.invalid) {
      return;
  }
  document.getElementById("closeModalButton").click();
  const data = this.registerForm.value
  data['dogDetail'] = this.selectedDogDetails

 this.firebaseService.getAdoptDogsDetailsByName(data.name).subscribe((response)=>{

   let a = response.data()
  //  new
   if(a == undefined) {
    let array:any[] = []
    array.push(data)
    const xyz = {
      data:array
    }
     this.firebaseService.addAdoptDogDetails(xyz,data.name).then((response=>{
    this.toaster.success('Send Information Successfully','Our Team Will Contact you Soon')
    this.getCurrentDogDetails()

  })).catch(error=>{
    this.toaster.error('Something Went Wrong','Please Try Again')

    console.log(error)
  })

   }else {
//  update

let array1:any  =[]
array1  =response.data()
let array4 = array1.data
array4.push(data)
const pq = {
 data:array4
}
this.firebaseService.addAdoptDogDetails(pq,data.name).then((response=>{
 this.toaster.success('Send Information Successfully','Our Team Will Contact you Soon')
 this.getCurrentDogDetails()

})).catch(error=>{
 this.toaster.error('Something Went Wrong','Please Try Again')

 console.log(error)
})

   }


 },(error)=>{
   console.log(error)
 })

}
  getDogDetail() {
    this.ngxService.start()
    this.dogDetailService.getDogDetails(this.dogId).subscribe((response:any)=>{
      this.ngxService.stop()
      this.selectedDogDetails = response
      this.selectedDogID = response.id
      if(this.hasValidAuthenticationToken) {
        this.getCurrentDogDetails()
      }

      this.getDogbyBreedFor(this.selectedDogDetails.breeds[0].id)
      console.log(response)
    },(error)=>{
      console.log(error)
    })
  }
  getDogbyBreedFor(id) {
    this.dogDetailService.getDogBybreedfor(id).subscribe((response)=>{

      this.selectedBreedFor = response

    },
    (error)=>{
      console.log(error)
    })
  }
  public get hasValidAuthenticationToken(): boolean {
    return this.localstorageService.hasValidAuthenticationToken()
  }
  getProfileData() {
    if(this.hasValidAuthenticationToken){
      let currentUser:any = this.localstorageService.getCurrentUserProfile()

      this.registerForm.patchValue({
        name :  currentUser.name,
        address : currentUser.address,
        city : currentUser.city,
        postalCode : currentUser.postalCode,
        phoneNumber : currentUser.phoneNumber,
      })
    }

  }

 getCurrentDogDetails() {
   let id = this.localstorageService.ActiveUserName()
   this.firebaseService.getSpecificUserDogList(id).then((response:any)=>{
    let a = response.data
    console.log('currentuser',a)
     let ab = a.find(x=>x.dogDetail.id == this.selectedDogID)
     console.log('currentuserss',ab)
     if (ab == undefined) {
      this.alreadyapply =false
     }else {
       this.alreadyapply =true
     }
    console.log('a',a)
   }).catch((error)=>console.log(error))

 }
}
