import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IContent } from '../model/content';
import { catchError,tap } from 'rxjs';
import { MessageService } from './message.service';
import { TokenStorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient, private messageService: MessageService, private tokenStorageService: TokenStorageService){}

  private contentURL = "http://localhost:8080/api/content";

  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenStorageService.getToken() })
  };

  log(message: string,op?: string | 'DataService'){
    this.messageService.add(message,op);
  }

  getContent(){
    return this.http.get<IContent[]>(this.contentURL)
    .pipe(
      tap(_ => this.log('Get all content','DataService')),
      catchError(this.handleError<IContent[]>('getAllContents', []))
    )
  }

  // getContentByPage(page: number){
  //   const url = `http://localhost:8080/api/content?page=${page}&size=6`;

  //   return this.http.get(url, {headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenStorageService.getToken() })})
  //   .pipe(
  //     tap(_=> this.log(`Navigate to Content page ${page}`)),
  //     catchError(this.handleError<IContent[]>('getContentByPage', []))
  //   )
  // }

  getContentByPage(page: number){
    const url = `http://localhost:8080/api/content?page=${page}&size=6`;

    return this.http.get(url)
    .pipe(
      tap(_=> this.log(`Navigate to Content page ${page}`)),
      catchError(this.handleError<IContent[]>('getContentByPage', []))
    )
  }

  searchContent(keyword: string){
    const url = `http://localhost:8080/api/content/search/${keyword}`;
    return this.http.get<IContent[]>(url)
    .pipe(
      tap(_ => this.log(`Searched for ${keyword}`,'DataService')),
      catchError(this.handleError<IContent[]>('getAllContents', []))
    )
  }

  addContent(content: IContent){
    return this.http.post<IContent>(this.contentURL,content)
    .pipe(
      tap(_ => this.log(`Added content with the Title of ${content.title}`, 'DataService')),
      catchError(this.handleError<IContent>('AddContent', {} as IContent))
    )
  }

  deleteContent(id?:number){
    const url = `http://localhost:8080/api/content/${id}`;
    return this.http.delete<IContent>(url)
    .pipe(
      tap(_ => this.log(`Deleted content with the ID of ${id}`, 'DataService')),
      catchError(this.handleError<IContent>('deleteContent', {} as IContent))
    )
  }

  getContentByID(id:number){
    const url = `http://localhost:8080/api/content/${id}`;
    return this.http.get<IContent>(url)
    .pipe(
      tap(_ => this.log(`Get content with the ID of ${id}`, 'DataService')),
      catchError(this.handleError<IContent>('getContentByID', {} as IContent))
    )
  }

  updateContent(content:IContent){
    const url = `http://localhost:8080/api/content/${content.id}`;
    return this.http.put<IContent>(url,content)
    .pipe(
      tap(_ => this.log(`Update content with the ID of ${content.id}`, 'DataService')),
      catchError(this.handleError<IContent>('updateContent', {} as IContent))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}