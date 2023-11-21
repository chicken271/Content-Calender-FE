import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable,catchError,of, tap } from 'rxjs';
import { IUser } from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient){}

  getAllUsers(){
    const url = `http://localhost:8080/api/user/getUsers`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError<IUser[]>('getAllUsers',[]))
    );
  }

  getUserByEmail(email: String){
    const url =  `http://localhost:8080/api/user/${email}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError<IUser>('getUserByEmail',{} as IUser))
    );
  }

  registerUser(user: IUser){
    const url = `http://localhost:8080/api/user/register`;
    return this.http.post<IUser>(url, user).pipe(
      catchError(this.handleError<IUser>('registerUser', {} as IUser))
    );
  }

  loginUser(user:{username:string,password:string}){
    const url = `http://localhost:8080/token`;
    // return this.http.post<string>(url, user).pipe(
    //   catchError(this.handleError<string>('registerUser'))
    // );
    return this.http.post(url, user, { responseType: 'text' }).pipe(
      catchError(this.handleError<string>('loginUser'))
    );
  }

  getUserByUsernameAndPassword(username: string, password: string){
    const url = `http://localhost:8080/api/user?username=${username}&password=${password}`;
    return this.http.get(url).pipe(
      catchError(this.handleError<IUser>('getUserByUsernameAndPassword', {} as IUser))
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