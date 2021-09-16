import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpClientModule } from '@angular/common/http';
import { DogDetailsComponent } from './components/dog-details/dog-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SearchDogComponent } from './components/search-dog/search-dog.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
var config = {
  apiKey: "AIzaSyBdUla0_zGwifnoQuwGG_1uRNhoKvrIBtc",
  authDomain: "dogs-6a1dd.firebaseapp.com",
  projectId: "dogs-6a1dd",
  storageBucket: "dogs-6a1dd.appspot.com",
  messagingSenderId: "292340629548",
  appId: "1:292340629548:web:3da404fa23dfb06a441189",
  measurementId: "G-ZGR8157RZK"
};
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DogDetailsComponent,
    LoginComponent,
    RegisterComponent,
    SearchDogComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    SlickCarouselModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    NgxUiLoaderModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,
    FormsModule
     // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
