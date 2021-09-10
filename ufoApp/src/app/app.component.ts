import { Component } from '@angular/core';
import { NbMenuItem, NbSearchService, NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ufoApp';
  value = '';

  items: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'home',
      link: '',
      home: true
    },
    {
      title: 'Maps',
      icon: 'map',
      link: '/maps'
    },
    {
      title: 'Charts',
      icon: 'pie-chart-2',
      link: '/charts'
    }
  ];

  constructor(private searchService: NbSearchService, private readonly sidebarService: NbSidebarService) {

    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.value = data.term;
      })
    }

    toggleSidebar(): boolean {
      this.sidebarService.toggle();
      return false;
    }
  
}
