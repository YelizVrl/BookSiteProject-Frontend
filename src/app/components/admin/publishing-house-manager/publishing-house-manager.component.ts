import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PublishingHouse } from 'src/app/models/publishing-house';
import { PublishingHouseService } from 'src/app/services/publishing-house.service';

@Component({
  selector: 'app-publishing-house-manager',
  templateUrl: './publishing-house-manager.component.html',
  styleUrls: ['./publishing-house-manager.component.css']
})
export class PublishingHouseManagerComponent implements OnInit {

  publishingHouses : PublishingHouse[];
  publishingHouseAddForm: FormGroup;

  constructor(private publishingHouseService: PublishingHouseService,
    private toastrService: ToastrService,
    private formBuilder:FormBuilder
   ) { }

  ngOnInit(): void {
    this.getPublishingHouses();
    this.createPublishingHouseAddForm();
  }

  createPublishingHouseAddForm(){
    this.publishingHouseAddForm = this.formBuilder.group({
      publishingHouseName: ["", Validators.required]
    })
  }

  getPublishingHouses() {
    this.publishingHouseService.getPublishingHouses().subscribe(response => {
      this.publishingHouses = response.data;
    })
  }


  add() {
    if (this.publishingHouseAddForm.valid) {
          let publishingHouseModel = Object.assign({}, this.publishingHouseAddForm.value);

          this.publishingHouseService.add(publishingHouseModel).subscribe(
            (response) => {
              this.toastrService.success(response.message, 'başarılı');
              this.getPublishingHouses();

            },
            (responseError) => {

              if (responseError.error.Errors.length > 0) {
                console.log(responseError)
                console.log(responseError.error.Errors);
                for (let i = 0; i < responseError.error.Errors.length; i++) {
                  this.toastrService.error(
                    responseError.error.Errors[i].ErrorMessage,
                    'Doğrulama hatası'
                  );
                }
              }
            }
          );
        }

  }

  delete(publishingHouse: PublishingHouse) {
    this.publishingHouseService.delete(publishingHouse).subscribe(response => {
      this.toastrService.success(publishingHouse.publishingHouseName + " yayınevi silindi", "Silme işlemi başarılı");
      this.getPublishingHouses();
    }, errorResponse => {
      this.toastrService.error(errorResponse.error.message, "Silme işlemi başarısız");
    })
  }
}
