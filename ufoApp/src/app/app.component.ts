import { Component } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ufoApp';
  
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

  constructor(private readonly sidebarService: NbSidebarService) {
    
    }

    toggleSidebar(): boolean {
      this.sidebarService.toggle();
      return false;
    }

    compactSidebar(): boolean {
      this.sidebarService.compact();
      return false;
    }
  
}
