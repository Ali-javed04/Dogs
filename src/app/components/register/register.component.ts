import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  verificationCode: string;
  emailId: string;

  constructor(
    private formBuilder: FormBuilder,
    private ngxService: NgxUiLoaderService,

   private toaster: ToastrService,
   private localStorageService:LocalstorageService,
   private router :Router,
   private firebaseService: FirebaseService) { }


ngOnInit(): void {


  this.registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', Validators.required],
    phoneNumber: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    acceptTerms: [false, Validators.requiredTrue]
})
}
get f() { return this.registerForm.controls; }

onSubmit() {
  this.submitted = true;
  if (this.registerForm.invalid) {
      return;
  }
  const data = this.registerForm.value
  const email = data.email
  const password = data.password
  this.ngxService.start()
 this.firebaseService.register(email,password).then(
   (res)=>{
     console.log(res.user.refreshToken)
     localStorage.setItem('authenticatedByLoginToken', res.user.refreshToken)
     console.log('register scucessfully')
     this.firebaseService.addNewUser(data).then(
       (res)=> {
         console.log(res)
         this.getUserData(email)
         this.toaster.success('Register Sucessfully')
         this.router.navigateByUrl('/')

         console.log("new user add scucessfully")
         this.ngxService.stop()


       }
     ).catch(error=>console.log(error))

   }


 ).catch(error=>console.log(error))



}

getUserData(email) {
  this.firebaseService.getUserData(email).subscribe((response)=>{
    let a = response.data()
    localStorage.setItem('userData', JSON.stringify(a))
  },(error)=>{
    console.log('userdata',error)
  })
}

}

