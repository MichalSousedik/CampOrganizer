import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CampOverview} from '../model/camp-overview';
import {tap} from 'rxjs/operators';
import {CampDetail} from '../model/camp-detail';


@Injectable({
    providedIn: 'root'
})
export class CampService {

    private campUrl = 'http://localhost:9000/camp';
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    constructor(private http: HttpClient) {
    }

    getCamps(): Observable<CampOverview[]> {
        return this.http.get<CampOverview[]>(this.campUrl);
    }

    getCamp(id: number): Observable<CampDetail> {
        const url = `${this.campUrl}/${id}`;
        return this.http.get<CampDetail>(url);
    }

    addCamp(camp: CampOverview): Observable<any> {
        return this.http.post<CampOverview>(this.campUrl, camp, this.httpOptions).pipe(
            tap(_ => console.log(`camp created`))
        );
    }

    removeCamp(id: number): Observable<any> {
        const url = `${this.campUrl}/${id}`;
        return this.http.delete<CampOverview>(url, this.httpOptions).pipe(
            tap(_ => console.log(`deleted camp id=${id}`))
        );
    }
}
