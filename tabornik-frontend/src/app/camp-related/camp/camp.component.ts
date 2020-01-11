import { Component, OnInit } from '@angular/core';
import {CampService} from '../../service/camp.service';
import {ActivatedRoute} from '@angular/router';
import {CampDetail} from '../../model/camp-detail';

@Component({
  selector: 'app-camp',
  templateUrl: './camp.component.html',
  styleUrls: ['./camp.component.css']
})
export class CampComponent implements OnInit {


  camp: CampDetail;
  loaded = false;

  constructor(private campService: CampService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCamp();
  }

  private getCamp() {
    const id = this.route.snapshot.paramMap.get('id');
    this.campService.getCamp(+id).subscribe(camp => {
      this.camp = camp;
      this.loaded = true;
    });
  }

}
