import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { TheadTitlesRowComponent } from 'ng2-smart-table/lib/components/thead/rows/thead-titles-row.component';
import { ufo_summary } from '../models/summary';
import { TreeNode } from '../models/treenode';
import { UfoapiService } from '../services/ufoapi.service';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  // tree grid table vars
  // allColumns = ['summary', 'city', 'state', 'date_time'];
  data: ufo_summary[];
  st: string;
  my: string;
  loading = false;
  records = 0;

  ufoSummary: ufo_summary[];
  // ng2 smart table
  source: LocalDataSource; 
  settings = {
    columns: {
      id: {
        title: 'summary'
      },
      name: {
        title: 'city'
      },
      username: {
        title: 'state'
      },
      email: {
        title: 'date_time'
      }
    }
  };

  constructor(private route: ActivatedRoute, 
        private ufoService: UfoapiService) { }

  ngOnInit(): void {
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
        this.data = result;
        // this.data = [
        //   {data: { id: 0, summary: '', city: '', state: '', date_time: '' },
        // },
        // ];
        // this.data.pop();
        // this.ufoSummary.forEach( each => {
        //   var p = {data: 
        //     { id: each.id, summary: each.summary, city: each.city, state: each.state, date_time: each.date_time },
        //   }
        //   this.data.push(p)

        // })
        this.loading = false;
      }
    )

  }

}
