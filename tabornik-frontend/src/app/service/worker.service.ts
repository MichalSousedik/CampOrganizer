import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Worker} from '../model/worker';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CampOverview} from '../model/camp-overview';
import {tap} from 'rxjs/operators';
import {CampWorker} from '../model/camp-worker';
import {WorkerResponse} from '../model/worker-response';

@Injectable({
    providedIn: 'root'
})
export class WorkerService {

    private campWorkerUrl = 'http://localhost:9000/campWorker';
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    constructor(private http: HttpClient) {
    }

    getPendings(id: number): Observable<WorkerResponse[]> {
        const url = `${this.campWorkerUrl}/${id}/pending`;
        return this.http.get<WorkerResponse[]>(url);
    }

    addPendingToWorkers(worker: Worker, campId: number) {
        return this.http.put<CampOverview>(
            this.campWorkerUrl, new CampWorker(campId, worker.id, worker.position, false), this.httpOptions
        ).pipe(
            tap(_ => console.log(`worker added to camp`))
        );
    }

    removeWorker(worker: Worker, campId: number) {
        const url = `${this.campWorkerUrl}/${campId}/${worker.id}`;
        return this.http.delete<CampOverview>(url, this.httpOptions).pipe(
            tap(_ => console.log(`worker ${worker.id} removed from camp ${campId}`))
        );
    }

    getWorkers(id: number): Observable<WorkerResponse[]> {
        const url = `${this.campWorkerUrl}/${id}/current`;
        return this.http.get<WorkerResponse[]>(url);
    }

    editWorker(worker: Worker, campId: number): Observable<any> {
        return this.http.put<CampOverview>(
            this.campWorkerUrl, new CampWorker(campId, worker.id, worker.position, false), this.httpOptions
        ).pipe(
            tap(_ => console.log(`worker's position changed`))
        );
    }

    addWorker(worker: Worker, campId: number) {
        return this.http.post<CampOverview>(
            this.campWorkerUrl, new CampWorker(campId, worker.id, worker.position, false), this.httpOptions
        ).pipe(
            tap(_ => console.log(`worker added to camp`))
        );
    }
}
