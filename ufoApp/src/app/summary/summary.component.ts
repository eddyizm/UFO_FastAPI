import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { States } from '../models/states';
import { ufo_summary } from '../models/summary';
import { UfoapiService } from '../services/ufoapi.service';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  // ng2 smart table
  states = new States()
  st: string;
  my: string;
  sum: string;
  loading = false;
  records = 0;

  ufoSummary: ufo_summary[];
  // ng2 smart table
  data: LocalDataSource;
  settings = {
    actions: 'false'
    ,
    columns: {
      summary:
      {
        title: 'Summary'

      },
      city: {
        title: 'City'
      },
      state: {
        title: 'State'
      },
      date_time: {
        title: 'Date'
      }
    }
  };

  constructor(private route: ActivatedRoute, private router: Router,
    private ufoService: UfoapiService) { }

  ngOnInit(): void {
    this.data = new LocalDataSource();
    this.route.queryParams.subscribe
      (params => {
        this.my = params['myear'] ?? '';
        this.st = params['st'] ?? '';
        this.load(this.st, this.my);
      });
  }

  load(state: string, myear: string) {
    this.loading = true;
    this.ufoService.getSummary(state, myear).subscribe(
      (result) => {
        this.ufoSummary = result;
        this.records = this.ufoSummary.length;
        this.data.load(this.ufoSummary);
        this.sum = (this.my === '') ? this.states.stateHash[this.st] : this.my;
        this.loading = false;
      }
    )

  }

  onSelectRow(event) {
    this.router.navigateByUrl(`/detail/${event.data.id}`);
  }

}
