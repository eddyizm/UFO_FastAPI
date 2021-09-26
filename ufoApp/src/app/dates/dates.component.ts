import { Component, OnInit } from '@angular/core';
import { UFO_Dates } from '../models/ufo_dates';
import { UfoapiService } from '../services/ufoapi.service';
import { LocalDataSource } from 'ng2-smart-table';
import { LinkviewComponent } from '../linkview/linkview.component';


@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  
  styleUrls: ['./dates.component.scss']
})
export class DatesComponent implements OnInit {

  public ufoMY: UFO_Dates[];
  allColumns = [ 'month_year', 'count' ];
  loading = false;
  
  // ng2 smart table
  data: LocalDataSource; 
  settings = {
    actions: 'false',
    columns: {
      month_year: {
        title: 'Month/Year',
        type: 'custom',
        renderComponent: LinkviewComponent,
        // type: 'html',
        // valuePrepareFunction: (row) => {
        //   // <a [routerLink]="['/summary']" [queryParams]="{ myear: row.data.month_year}"> {{row.data.month_year}}</a> 
        //   return `<a href="/summary?myear=${row}">${row}</a>`;                   
        // }, 
        filter: false

      },
      count: {
        title: 'Count',
        filter: false
      }
    }
  };

  constructor(private ufoService: UfoapiService) { 
    }

  ngOnInit(): void {
    this.data = new LocalDataSource();
    this.load();
  }

  load() {
    this.loading = true;
    this.ufoService.getLocateDateList()
      .subscribe(
        (result) => {
        this.ufoMY = result;
        this.data.load(this.ufoMY);
        this.loading = false;
      });
    
      
  }


}
