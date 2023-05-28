import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment as env} from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { HttpOptions } from '../http-options';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {

  @Output() onSubmit = new EventEmitter<string>()

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getUrl() {
    return env.baseUrl + '/api/upload/image?token='+this.authService.token
  }

  submit(input: HTMLInputElement) {
    console.log(input.value)
    this.onSubmit.emit(input.value)
    input.value = ''
  }

}
