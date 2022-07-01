import { Component, HostBinding, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { TabService } from '../services/tab.service';
import { AppInfoService, ScreenService } from '../shared/services';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  public loading = false;

  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }
  
  constructor(
    public appInfo: AppInfoService,
    public tabService: TabService,
    private screen: ScreenService,
    private router: Router
  ) { 

    this.router.events.subscribe((event: any) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }

        default:{
          break;
        }
      }
    })

  }

  ngOnInit(): void {
    this.router.navigateByUrl('/');
    this.tabService.resetTabs();
  }

}
