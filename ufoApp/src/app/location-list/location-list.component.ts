import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UFO } from '../models/ufo';
import { UfoapiService } from '../services/ufoapi.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {

  st: string;
  ufoSightings: UFO[];

  constructor(private route: ActivatedRoute, private ufoService: UfoapiService) { }

  ngOnInit(): void {
    this.st = this.route.snapshot.paramMap.get("state");
    this.ufoService.getStateLocationList(this.st).subscribe(
      (results) => {
        this.ufoSightings = results;
        console.log(results);
      }, 
    (err) => {
      console.error(err);
    });
  }

}
