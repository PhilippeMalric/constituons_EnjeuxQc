import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from "../../environments/environment"
import { Enjeux } from "../class/Enjeux"
import { Personne } from 'src/app/class/Personne';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import {  of, throwError } from 'rxjs';

const apiUrl = "http://localhost:80/api/enjeux/";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EnjeuxService {

  
  
  constructor(private http: HttpClient) {

  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }


  getBook(id: string): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postBook(data): Observable<any> {
    return this.http.post(apiUrl, data, httpOptions)
      .pipe(
      catchError(this.handleError)
      );
  }

  updateBook(id: string, data): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, data, httpOptions)
      .pipe(
      catchError(this.handleError)
      );
  }

  deleteBook(id: string): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
      catchError(this.handleError)
      );
  }


}
