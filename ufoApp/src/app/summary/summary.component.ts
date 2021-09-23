import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  allColumns = ['id', 'summary', 'city', 'state', 'date_time'];
  data: TreeNode<ufo_summary>[];
  st: string;
  my: string;
  loading = false;

  ufoSummary: ufo_summary[];

  constructor(private route: ActivatedRoute, private ufoService: UfoapiService) { }

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
        this.data = [
          {data: { id: 0, summary: '', city: '', state: '', date_time: '' },
        },
        ];
        this.data.pop();
        this.ufoSummary.forEach( each => {
          var p = {data: 
            { id: each.id, summary: each.summary, city: each.city, state: each.state, date_time: each.date_time },
          }
          this.data.push(p)

        })
        this.loading = false;
      }
    )

  }

}
