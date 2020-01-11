import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CampService} from '../../service/camp.service';
import {CampDetail} from '../../model/camp-detail';
import {CampOverview} from '../../model/camp-overview';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  campDetail: CampDetail;
  loaded = false;
  camp: CampOverview;

  constructor(private campService: CampService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCamp();
  }

  private getCamp() {
    const id = this.route.parent.snapshot.paramMap.get('id');
    this.campService.getCamp(+id).subscribe(camp => {
      this.campDetail = camp;
      this.camp = camp.camp;
      this.loaded = true;
    });
  }
}
