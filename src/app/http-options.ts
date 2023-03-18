import { HttpHeaders } from "@angular/common/http";

export class HttpOptions {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  })
}
