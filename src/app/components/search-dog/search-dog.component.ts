import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SearchDogService } from 'src/app/services/search-dog.service';

@Component({
  selector: 'app-search-dog',
  templateUrl: './search-dog.component.html',
  styleUrls: ['./search-dog.component.scss']
})
export class SearchDogComponent implements OnInit {
  breedNames= []
  avalaibleHeight = [15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,
    62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89]
  filterDogsList :any= [];
  selectedBreedID:number = 1
  selectedBreedHeight: number = 0;
  constructor(private searchDogService: SearchDogService,
    private loader:NgxUiLoaderService) { }

  ngOnInit(): void {
    this.getAllBreedList()
  }

  getAllBreedList() {
    this.loader.start()
    this.searchDogService.GetAllbreedList().subscribe((response)=>{
      this.loader.stop()
      console.log(response)
      let a:any = response
      let b  = a.map(x=>{
        const obj = {
          name:x.name,
          id:x.id
        }
        this.breedNames.push(obj)})
        this.filterData()


    },(error)=>{
      console.log(error)
    })
  }
  filterData() {

    this.searchDogService.GetDogofSpecificBreed(this.selectedBreedID).subscribe((response)=>{
      this.filterDogsList  = response
      console.log(response)
      this.filterDogsList.map(x=>{
         let a = x.breeds[0].height.metric
         let b = a.substring(0,2);
        let matricHeight =  parseInt(b.toString())
        x.matricHeight = matricHeight;
        return x
      })
      if(this.selectedBreedHeight != 0){
        this.filterDogsList = this.filterDogsList.filter(x=>x.matricHeight == this.selectedBreedHeight)
      }
    },(error)=>{
      console.log(error)
    })


  }
  onChangeBreedID(id) {
    this.selectedBreedID = id
}
onChangeBreedHeight(height) {
  this.selectedBreedHeight = height
}

}
