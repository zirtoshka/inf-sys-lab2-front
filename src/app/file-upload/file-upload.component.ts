import {Component, inject} from '@angular/core';

import {NzUploadComponent} from 'ng-zorro-antd/upload';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NgIf} from '@angular/common';
import {BaseService} from '../services/base.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

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
  private notificationService = inject(NzNotificationService);

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
      this.notificationService.warning(
        "hey!",
        "Please select a file."
      )
      return;
    }


    this.isLoading = true;
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.baseService.import(formData, "person/import")
      .subscribe({
        next: (response: any) => {
          window.document.location.reload();
          this.isLoading = false;
          if(response.code==500) {
            this.notificationService.error("oops", response.body);
          }else{
            this.notificationService.success("success", "uploading is ok")
          }
        },

        error: (error) => {
          this.isLoading = false;
          this.notificationService.error("oops", "uploading failed")
        },
      });
  }


}

