import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { environment as env} from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  faArrowUpFromBracket = faArrowUpFromBracket
  url = env.baseUrl + '/api/upload/image?token='+this.authService.token
  uploadForm!: FormGroup
  select = false
  @Output() onSubmit = new EventEmitter<string>()
  @ViewChild('image') image!: HTMLInputElement

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      image: ''
    })
  }

  fileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.uploadForm.get('image')!.setValue(file)
      this.submit()
    }
  }

  submit() {
    const formData = new FormData()
    formData.append('image', this.uploadForm.get('image')!.value)

    this.http.post<any>(this.url, formData)
      .subscribe(response => {
        console.log(response)
        const filename = response.filename
        this.onSubmit.emit(filename)
      })
  }

}
