import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Writer } from 'src/app/models/writer';
import { WriterService } from 'src/app/services/writer.service';

@Component({
  selector: 'app-writer-manager',
  templateUrl: './writer-manager.component.html',
  styleUrls: ['./writer-manager.component.css']
})
export class WriterManagerComponent implements OnInit {

  writers : Writer[];
  writerAddForm: FormGroup;

  constructor(private writerService: WriterService,
    private toastrService: ToastrService,
    private formBuilder:FormBuilder
   ) { }

  ngOnInit(): void {
    this.getWriters();
    this.createWriterAddForm();
  }

  createWriterAddForm(){
    this.writerAddForm = this.formBuilder.group({
      writerName: ["", Validators.required]
    })
  }

  getWriters() {
    this.writerService.getWriters().subscribe(response => {
      this.writers = response.data;
    })
  }


  addWriter() {
    if (this.writerAddForm.valid) {
          let writerModel = Object.assign({}, this.writerAddForm.value);

          this.writerService.add(writerModel).subscribe(
            (response) => {
              this.toastrService.success(response.message, 'başarılı');
              this.getWriters();

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

  delete(writer: Writer) {
    this.writerService.delete(writer).subscribe(response => {
      this.toastrService.success(writer.writerName + " adlı yazar silindi", "Silme işlemi başarılı");
      this.getWriters();
    }, errorResponse => {
      this.toastrService.error(errorResponse.error.message, "Silme işlemi başarısız");
    })
  }
}
