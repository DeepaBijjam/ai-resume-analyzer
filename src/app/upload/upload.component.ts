import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { finalize, Observable, Subscription, throwError } from 'rxjs';


@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {

 

status: "initial" | "uploading" | "success" | "fail" = "initial";
  file: File | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.status = "initial";
      this.file = file;
    }
  }

  onUpload() {

    if (this.file) {
      const formData = new FormData();

      formData.append("file", this.file, this.file.name);

      const upload$ = this.http.post("http://localhost:8093/api/upload", formData,{ responseType: 'text' });

      this.status = "uploading";

      upload$.subscribe({
        next: () => {
          this.status = "success";
        },
        error: (error: any) => {
          this.status = "fail";
          return throwError(() => error);
         
        },
      });
    }
  }
 }
