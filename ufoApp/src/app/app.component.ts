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
      link: '/home',
      home: true
    },
    {
      title: 'By Location',
      icon: 'map',
      link: '/locations'
    },
    {
      title: 'By Date',
      icon: 'calendar',
      link: '/dates'
    },
    {
      title: 'By Shape',
      icon: 'navigation-2',
      link: '/shape'
    },
    {
      title: 'Report Sighting',
      icon: 'phone',
      link: '/report'
    },
    {
      title: 'Site',
      icon: 'browser',
      link: '/site'
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
