import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DogDetailsService {

  constructor(private httpclient:HttpClient) { }

  getDogDetails(id) {
    return this.httpclient.get(`https://api.thedogapi.com/v1/images/${id}`)
  }
  getDogBybreedfor(id) {
    return this.httpclient.get(`https://api.thedogapi.com/v1/images/search?api_key=b87e7de1-a643-4b7e-a3b5-d1bf10fcae8d&breed_id=${id}&limit=100`)
  }
}
