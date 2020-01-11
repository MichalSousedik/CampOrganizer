import {Component, OnInit} from '@angular/core';
import {HTTPStatus} from '../../service/http-status';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

    HTTPActivity: boolean;

    constructor(private httpStatus: HTTPStatus) {
        this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
            this.HTTPActivity = status;
        });
    }

    ngOnInit() {
    }

}
