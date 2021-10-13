import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UFO } from '../models/ufo';
import { UfoapiService } from '../services/ufoapi.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  id: string;
  loading: boolean = false;
  imagePath: string;
  detail: UFO;
  constructor(private ufoService: UfoapiService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.loadDetail(this.id);
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  loadDetail(id: string){
    this.loading = true;
    this.ufoService.getUFODetail(id).subscribe(
      (result) => {
        this.detail = result;
        if (result.shape == '')
          { result.shape = 'unknown'}
          this.imagePath = `/assets/images/${result.shape}.jpg`
        this.loading = false;
      });
  }
}
