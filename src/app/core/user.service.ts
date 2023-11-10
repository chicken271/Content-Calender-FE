import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable,catchError,of } from 'rxjs';
import { IUser } from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient){}

  getUserByEmail(email: String){
    const url =  `http://localhost:8080/api/user/${email}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError<IUser>('getUserByEmail',{} as IUser))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}