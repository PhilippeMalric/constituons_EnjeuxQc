import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class MajsrvService {

  devMode = !environment.production

  constructor(private http: HttpClient) {

  }

  //methodes pour obtenir un observable ( ou un json )
  getTest(collection: string, skip: string, limit: string) {
    let url = `http://localhost:80/api/collection=${collection}/skip=${skip}/limit=${limit}`
    console.log("Url : ", url)
    return this.http.get<any[]>(url)
  }




}

