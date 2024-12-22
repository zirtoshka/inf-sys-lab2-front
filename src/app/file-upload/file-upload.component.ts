import {HttpClient, HttpRequest, HttpResponse} from '@angular/common/http';
import {Component, inject} from '@angular/core';
import {filter} from 'rxjs/operators';

import {NzMessageService} from 'ng-zorro-antd/message';
import {NzUploadComponent, NzUploadFile} from 'ng-zorro-antd/upload';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NgIf} from '@angular/common';
import {BaseService} from '../services/base.service';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    NzUploadComponent,
    NzIconDirective,
    NzButtonComponent,
    NgIf
  ],
  templateUrl: './file-upload.component.html'

})
export class FileUploadComponent {
  private baseService = inject(BaseService);

  isLoading = false;
  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (!this.selectedFile) {
      alert('Please select a file.');
      return;
    }


    this.isLoading = true;
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.baseService.import(formData, "person/import")
      .subscribe({
        next: (response:any) => {
          this.isLoading = false;
          alert(response);
        },

        error: (error) => {
          this.isLoading = false;
          console.log(error);
        },
      });
  }


}

