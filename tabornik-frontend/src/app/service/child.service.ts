import {Injectable} from '@angular/core';
import {Child} from '../model/child';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ChildService {

    private campUrl = 'http://localhost:9000/camp';
    private childUrl = 'http://localhost:9000/child';
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    constructor(private http: HttpClient) {
    }

    getChildren(campId: number): Observable<Child[]> {
        const url = `${this.campUrl}/${campId}/child`;
        return this.http.get<Child[]>(url);
    }

    edit(child: Child): Observable<any> {
        return this.http.put<Child>(
            this.childUrl, child, this.httpOptions
        ).pipe(
            tap(_ => console.log(`child was edited`))
        );
    }

    remove(childId: number) {
        const url = `${this.childUrl}/${childId}`;
        return this.http.delete<Child>(url, this.httpOptions).pipe(
            tap(_ => console.log(`deleted camp id=${childId}`))
        );
    }
}
