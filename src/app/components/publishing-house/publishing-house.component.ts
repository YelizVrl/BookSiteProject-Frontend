import { Component, OnInit } from '@angular/core';
import { PublishingHouse } from 'src/app/models/publishing-house';
import { PublishingHouseService } from 'src/app/services/publishing-house.service';

@Component({
  selector: 'app-publishing-house',
  templateUrl: './publishing-house.component.html',
  styleUrls: ['./publishing-house.component.css']
})
export class PublishingHouseComponent implements OnInit {

  dataLoaded = false;
  publishingHouses: PublishingHouse[]=[];
  currentPublishingHouse: PublishingHouse;
  filterText = '';

  constructor(private publishingHouseService:PublishingHouseService) { }

  ngOnInit(): void {
    this.getPublishingHouses();
  }

  getPublishingHouses() {
    this.publishingHouseService.getPublishingHouses().subscribe(response=>{
      this.publishingHouses = response.data
      this.dataLoaded = true;
    })
  }

  setCurrentPublishingHouse(publishingHouse:PublishingHouse){
    this.currentPublishingHouse = publishingHouse;
  }

  getCurrentPublishingHouseClass(publishingHouse:PublishingHouse){
    if(publishingHouse == this.currentPublishingHouse ){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }


  getAllPublishingHouseClass(){
    if(!this.currentPublishingHouse ){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }


  CleanCurrentPublishingHouse() {
    this.currentPublishingHouse == null;
  }

  resetCurrentPublishingHouse() {
    this.currentPublishingHouse = {publishingHouseId:0, publishingHouseName:""};
  }


}
