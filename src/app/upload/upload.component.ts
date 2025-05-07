import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { finalize, Observable, Subscription, throwError } from 'rxjs';
import { ResultService } from '../result.service';


@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})



export class UploadComponent {
  
  textareaContent: string = '';
  loadCounter = 0;

  status: "initial" | "uploading" | "success" | "fail" = "initial";
  file: File | null = null;

  fileUploadStatus: boolean = false;
  textUploadStatus: boolean = false;
  comparisonResult: string = '';

  constructor(private http: HttpClient,private resultService:ResultService) {}

  onChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.status = "initial";
      this.file = file;
    }
  }

  uploadFile() {
    if (this.file) {
      const formData = new FormData();
      formData.append("file", this.file, this.file.name);

      this.status = "uploading";

      this.http.post("http://localhost:8093/api/upload", formData, { responseType: 'text' }).subscribe({
        next: () => {
          this.fileUploadStatus = true;
          this.checkUploadStatus();
        },
        error: () => {
          this.status = "fail";
        },
      });
    }
  }

sendText() {
  const data = { text: this.textareaContent }; // Ensure this matches backend expectations
  console.log("Sending text data:", data);

  const jsonString = JSON.stringify(data);
  
  this.http.post('http://localhost:8093/api/savetext', jsonString, {
    headers: { 'Content-Type': 'application/json' } ,// Specify content type explicitly
    responseType: 'text' 
  }).subscribe({
    next: () => {
      this.textUploadStatus = true;
      this.checkUploadStatus();
    },
    error: (error) => {
      console.error("Text upload error:", error);
      this.status = "fail";
    }
  });

  console.log("JSON String to send:", jsonString);
}


  checkUploadStatus() {
    if (this.fileUploadStatus && this.textUploadStatus) {
      this.status = "success";
    }
  }

  onAnalyze() {
   
    this.status = "uploading";

    this.uploadFile();
    this.sendText();

    
    this.resultService.compareResume().subscribe(
      result => {
        // Pretty-print JSON with 2 spaces indentation.
        this.comparisonResult = JSON.parse(JSON.stringify(result, null, 2));
      },
      error => console.error('Error comparing resume:', error)
    );
  
}

onCountAnalyze() {
  this.loadCounter++;

  if (this.loadCounter >= 2) {
    this.status = 'success'; // Show the output only after second submit
  } else {
    this.status = 'uploading'; // Indicate loading state before showing the output
  }
}


}



