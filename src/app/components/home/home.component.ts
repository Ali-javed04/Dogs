import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  slides = [
    {img: "assets/dog11.jpg",title: "paksitan"},
    {img: "assets/dog33.jpg",title: 'India'},
    {img: "assets/dog44.jpg" ,title: 'sudia Araab'},
    {img: "assets/dog77.jpg",title: 'dubai'}

  ];
  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": true,
    "infinite": true,
    "autoplaySpeed": 3000,
    "autoplay": true,
    "swipeToSlide":true
};

blogs = [
  {
    blogImg: "/assets/dog7.jpg",
    authorName:'Galee Fort',
    date:'2 feb 2021',
    blogTitle:'Gille',
    desp: 'ist line which is show about the blog desicribe the blog of which is below',
  },
  {
    blogImg: "/assets/smm2.jpg",
    authorName:'Galee Fort',
    date:'2 feb 2021',
    blogTitle:'Gille',
    desp: 'ist line which is show about the blog desicribe the blog of which is below',
  },
  {
    blogImg: "/assets/smm3.jpg",
    authorName:'Galee Fort',
    date:'2 feb 2021',
    blogTitle:'Gille',
    desp: 'ist line which is show about the blog desicribe the blog of which is below',
  },
  {
    blogImg: "/assets/smm4.jpg",
    authorName:'Galee Fort',
    date:'2 feb 2021',
    blogTitle:'Gille',
    desp: 'ist line which is show about the blog desicribe the blog of which is below',
  },

]
totalbreeds1: any;
totalbreeds2: any;
totalbreeds3: any;

  constructor(private homeService: HomeService,
    private loader:NgxUiLoaderService) { }

  ngOnInit(): void {
    this.getBreed1()
    this.getBreed2()
    this.getBreed3()
  }

  getBreed1() {
    this.loader.start()
    this.homeService.getbreed1().subscribe((response)=>{
      this.loader.stop()

      this.totalbreeds1  = response
      this.totalbreeds1 = _.take(this.totalbreeds1,4)


    },(error)=>{
      console.log(error)
    })

  }
  getBreed2() {

    this.homeService.getbreed2().subscribe((response)=>{


      this.totalbreeds2  = response
      this.totalbreeds2 = _.take(this.totalbreeds2,4)


    },(error)=>{
      console.log(error)
    })

  }
  getBreed3() {

    this.homeService.getbreed3().subscribe((response)=>{


      this.totalbreeds3  = response
      this.totalbreeds3 = _.take(this.totalbreeds3,4)


    },(error)=>{
      console.log(error)
    })

  }

}
