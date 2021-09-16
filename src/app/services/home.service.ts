import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpclient:HttpClient) { }

  getbreed1() {

   return this.httpclient.get('https://api.thedogapi.com/v1/images/search?api_key=b87e7de1-a643-4b7e-a3b5-d1bf10fcae8d&breed_id=1&limit=100')
  }
  getbreed2() {

    return this.httpclient.get('https://api.thedogapi.com/v1/images/search?api_key=b87e7de1-a643-4b7e-a3b5-d1bf10fcae8d&breed_id=5&limit=100')
   }
   getbreed3() {

    return this.httpclient.get('https://api.thedogapi.com/v1/images/search?api_key=b87e7de1-a643-4b7e-a3b5-d1bf10fcae8d&breed_id=3&limit=100')
   }
}
