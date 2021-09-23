import { Component, OnInit } from '@angular/core';
import { UFO } from '../models/ufo';
import { UfoapiService } from '../services/ufoapi.service';
@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  ufoSighting: UFO;
  imagePath: string;
  loading = false;
 
  constructor(private ufoService: UfoapiService) { }

  ngOnInit(): void {
    this.random();
  }

  public random(): void
  {
    this.loading = true;
    this.ufoService.getRandomUFO().subscribe(
        (result) => {
          this.ufoSighting = result;
          if (result.shape == '')
          { result.shape = 'unknown'}
          this.imagePath = `/assets/images/${result.shape}.jpg`
          this.loading = false;
        },
        (err) => {
          return console.error(err);
        }
      );
      this.loading = false;
  }

}
