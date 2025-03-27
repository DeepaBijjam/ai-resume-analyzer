import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { finalize, Subscription } from 'rxjs';

@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {

  fileName = '';

    constructor(private http: HttpClient) {}

    onFileSelected(event: Event) {

        const input = event.target as HTMLInputElement;
        if (input?.files && input.files[0]) {
            const file: File = input.files[0];

        if (file) {

            this.fileName = file.name;

            const formData = new FormData();

            formData.append("thumbnail", file);

            const upload$ = this.http.post("http://localhost:8092/api/upload", formData);

            upload$.subscribe();
            console.log(upload$);
        }
    }
  }
}
