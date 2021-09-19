import { Component, OnInit } from '@angular/core';
import { UFO_Dates } from '../models/ufo_dates';
import { UfoapiService } from '../services/ufoapi.service';
import { TreeNode } from '../models/treenode';


@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss']
})
export class DatesComponent implements OnInit {

  public ufoMY: UFO_Dates[];
  allColumns = [ 'month_year', 'count' ];
  data: TreeNode<UFO_Dates>[];
  
  constructor(private ufoService: UfoapiService ) { 
    }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.ufoService.getLocateDateList()
      .subscribe(
        (result) => {
        this.ufoMY = result;
        this.data = 
            [
              {
                data: { month_year: '', count: 0 },
              },
            ];
        this.data.pop() // what a hack this is. 
        this.ufoMY.forEach( each => {
          //console.log(each);
          var p = {
            data: { month_year: each.month_year, count: each.count },
          };
          this.data.push(p);
          
        })
        
      });
      
  }

}