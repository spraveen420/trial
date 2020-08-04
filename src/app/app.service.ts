import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8081/';
  getData(name): Observable<string> {
    return this.http.get<string>(this.url + 'src/outputHtml/' + name, { responseType: 'text' as 'json' });
  }

  update(data): Observable<any> {
    return this.http.post(this.url + 'updateData', data, { responseType: 'text' as 'json' });
  }

  sendReq(method, url, data): Observable<any>  {
    return this.http.request(method, url, { body: data });
  }
}
