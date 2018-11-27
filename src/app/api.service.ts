import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrlPersonne = "/api/personne";
const apiUrlEnjeu = "/api/enjeu";
const apiUrlOpinion = "/api/opinion";
const apiUrlOpinionByEnjeux = "/api/opinion/byEnjeu";



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

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
    console.log("extractData",res)
    let body = res;
    return body || { };
  }


//-----------------------------------------------Likes Dontlikes
addLikeToEnjeux(id): Observable<any> {

var url = apiUrlEnjeu+"/addLike/"+id

  console.log("apiUrlEnjeu add Likes : "+ url)

  return this.http.get(url, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

addDontLikeToEnjeux(id): Observable<any> {

  console.log("apiUrlEnjeu : "+apiUrlEnjeu)

  return this.http.get(apiUrlEnjeu+"/addDontLike/"+id, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

remLikeToEnjeux(id): Observable<any> {

  console.log("apiUrlEnjeu : "+apiUrlEnjeu)

  return this.http.get(apiUrlEnjeu+"/remLike/"+id, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

remDontLikeToEnjeux(id): Observable<any> {

  console.log("apiUrlEnjeu : "+apiUrlEnjeu)

  return this.http.get(apiUrlEnjeu+"/remDontLike/"+id, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

//----------------------------------------------Opinion Like DonLike

//Likes Unlikes
addLikeToOpinion(id): Observable<any> {

  console.log("apiUrlOpinion : "+apiUrlOpinion)

  return this.http.get(apiUrlOpinion+"/addLike/"+id, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

addDontLikeToOpinion(id): Observable<any> {

  console.log("apiUrlEnjeu : "+apiUrlOpinion)

  return this.http.get(apiUrlOpinion+"/addDontLike/"+id, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

remLikeToOpinion(id): Observable<any> {

  console.log("apiUrlEnjeu : "+apiUrlOpinion)

  return this.http.get(apiUrlOpinion+"/remLike/"+id, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

remDontLikeToOpinion(id): Observable<any> {

  console.log("apiUrlOpinion : "+apiUrlOpinion)

  return this.http.get(apiUrlOpinion+"/remDontLike/"+id, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}


//-----------------------------------------Personne
//Likes Unlikes
addLikeToPersonne(id): Observable<any> {

  console.log("apiUrlOpinion : "+apiUrlPersonne)

  return this.http.get(apiUrlPersonne+"/addLike/"+id, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

addDontLikeToPersonne(id): Observable<any> {

  console.log("apiUrlPersonne : "+apiUrlPersonne)

  return this.http.get(apiUrlPersonne+"/addDontLike/"+id, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

remLikeToPersonne(id): Observable<any> {

  console.log("apiUrlPersonne : "+apiUrlPersonne)

  return this.http.get(apiUrlPersonne+"/remLike/"+id, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

remDontLikeToPersonne(id): Observable<any> {

  console.log("apiUrlPersonne : "+apiUrlPersonne)

  return this.http.get(apiUrlPersonne+"/remDontLike/"+id, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

//------------------------------------------enjeux


  getEnjeux(): Observable<any> {

    console.log("apiUrlEnjeu : "+apiUrlEnjeu)

    return this.http.get(apiUrlEnjeu, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getEnjeu(id: string): Observable<any> {
    const url = `${apiUrlEnjeu}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postEnjeu(data): Observable<any> {
    return this.http.post(apiUrlEnjeu, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateEnjeu(id: string, data): Observable<any> {
    const url = `${apiUrlEnjeu}/${id}`;
    return this.http.put(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  addOpinion(id: string, data): Observable<any> {
    const url = `${apiUrlEnjeu}/addOpinion/${id}`;
    console.log("url",url)
    return this.http.put(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  deleteEnjeu(id: string): Observable<{}> {
    const url = `${apiUrlEnjeu}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


//------------------------------------------opinion

getOpinions(): Observable<any> {
  return this.http.get(apiUrlOpinion, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

getOpinionsByEnjeux(enjeuxId:string[]): Observable<any> {
  return this.http.post(apiUrlOpinionByEnjeux,enjeuxId,httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

getOpinion(id: string): Observable<any> {
  const url = `${apiUrlOpinion}/${id}`;
  return this.http.get(url, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

postOpinion(data): Observable<any> {
  return this.http.post(apiUrlOpinion, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

updateOpinion(id: string, data): Observable<any> {
  const url = `${apiUrlOpinion}/${id}`;
  return this.http.put(url, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

deleteOpinion(id: string): Observable<{}> {
  const url = `${apiUrlOpinion}/${id}`;
  return this.http.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

deleteOpinionFromOneEnjeu(opinionId,enjeuId): Observable<any> {
  var data = {
    opinionId:opinionId,
    enjeuId:enjeuId
  }
  return this.http.post(apiUrlOpinion+"/deleteFromOneEnjeu", data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

getPersonnes(): Observable<any> {
  return this.http.get(apiUrlPersonne, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

getPersonne(id: string): Observable<any> {
  const url = `${apiUrlPersonne}/${id}`;
  return this.http.get(url, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

postPersonne(data): Observable<any> {
  return this.http.post(apiUrlPersonne, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

updatePersonne(id: string, data): Observable<any> {
  const url = `${apiUrlPersonne}/${id}`;
  return this.http.put(url, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

deletePersonne(id: string): Observable<{}> {
  const url = `${apiUrlPersonne}/${id}`;
  return this.http.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

}
