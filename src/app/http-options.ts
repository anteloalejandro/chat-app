import { HttpHeaders, HttpParams } from "@angular/common/http";

export class HttpOptions {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  })
  params: HttpParams

  constructor(params?: string) {
    if (params)
      this.params = new HttpParams({fromString: params})
    else
      this.params = new HttpParams()
  }
}
