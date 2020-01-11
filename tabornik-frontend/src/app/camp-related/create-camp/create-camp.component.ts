import {Component, OnInit} from '@angular/core';
import {CampService} from '../../service/camp.service';
import {Router} from '@angular/router';
import {CampOverview} from '../../model/camp-overview';

@Component({
    selector: 'app-create-camp',
    templateUrl: './create-camp.component.html',
    styleUrls: ['./create-camp.component.css']
})
export class CreateCampComponent implements OnInit {

    camp: CampOverview = {id: 0, capacity: 0, occupied: 0, address: '', name: '', endDate: null, startDate: null};

    constructor(private campService: CampService,
                private router: Router) {
    }

    capacityError = false;
    dateError = false;

    ngOnInit() {
    }

    createCamp() {
        if (this.camp.capacity <= 0) {
            this.capacityError = true;
            return;
        } else {
            this.capacityError = false;
        }
        if (this.camp.startDate > this.camp.endDate) {
            this.dateError = true;
            return;
        } else {
            this.dateError = false;
        }
        this.campService.addCamp(this.camp).subscribe(
            _ => this.router.navigate(['/camp-list'])
        );

    }

}
