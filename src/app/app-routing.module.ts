import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DogDetailsComponent } from './components/dog-details/dog-details.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchDogComponent } from './components/search-dog/search-dog.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'dogdetails/:id', component:DogDetailsComponent
  },
  {
    path:'login', component:LoginComponent
  },
  {
    path:'register', component:RegisterComponent
  },
  {
    path:'searchdog', component:SearchDogComponent
  },
  {
    path:'admin', component:AdminDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
