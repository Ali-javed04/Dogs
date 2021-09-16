import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;




  pass: string  = 'password'
  userData:[] ;
  constructor(  private formBuilder: FormBuilder ,
    private router: Router,
    private firebaseService: FirebaseService,
    private toastr: ToastrService,
     private ngxService: NgxUiLoaderService) {  this.router.routeReuseStrategy.shouldReuseRoute = () => false;}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  });
}

get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
  if (this.registerForm.invalid) {
      return;
  }
  const data = this.registerForm.value
  const email = data.email
  console.log(data)
  this.ngxService.start()
  this.firebaseService.loginintoDatabase(data).then(
   (res)=>{
     this.ngxService.stop()
     let a = res.user.email
     localStorage.setItem('authenticatedByLoginToken', res.user.refreshToken)
     this.getUserData(a)
     this.toastr.success('login Sucessfully')
     this.router.navigateByUrl('/')
   }).catch(error=>{
   console.log(error)
   this.ngxService.stop()
   this.toastr.error('Something Went Wrong')})
  }
   eye(): void {
    if ( this.pass == 'text' ) {
      this.pass = 'password'
    } else if(this.pass == 'password'){
      this.pass = 'text'
    }
  }

signUp() {
  this.router.navigateByUrl('signup')
}
getUserData(email) {
  this.firebaseService.getUserData(email).subscribe((response)=>{
    let a = response.data()
    console.log('userdata',response.data())
    localStorage.setItem('userData', JSON.stringify(a))
  },(error)=>{
    console.log('userdata',error)
  })
}

}
