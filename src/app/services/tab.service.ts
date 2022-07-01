import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { threadId } from 'worker_threads';
import { Tab } from '../model/tab.model';
import { ModalEventService } from './modal-event.service';
import { ModalTrackingService } from './modal-tracking.service';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  public selectedIndex: number = 0;
  public tabs: any[] = [
    {
      id: 0,
      text: 'Dashboard',
      icon: 'chart',
      page: '/dashboard',
    }
  ]

  constructor(
    private router: Router,
    private modalTrackingService: ModalTrackingService,
    private modalEventService: ModalEventService
  ) { }

  selectTab(e: any) {
    //console.log(e);
    //this.selectedIndex = e.itemIndex;
  }

  addTab(tab: Tab, queryParams: any = {}) {
    debugger;
    var tabSearch = this.tabs.find(item => item.text == tab.text)

    if (!tabSearch) {
      const lengthTabs = this.tabs.length;
      this.tabs.push({ ...tab, id: lengthTabs });
      this.selectedIndex = lengthTabs;
      this.router.navigateByUrl(tab.page, { skipLocationChange: true });
    }
    else {
      this.selectedIndex = tabSearch.id;
      if (tab.text.includes("Detalle")) {
        this.modalTrackingService.hideLoading();
        this.modalEventService.hideLoading();    
        this.router.navigateByUrl(tab.page, { skipLocationChange: true });
      }
    }
  }

  showCloseButton(itemData: any) {
    return (this.tabs.length > 1 && itemData.id != 0);
  }

  closeButtonHandler(itemData: any) {
    const index = this.tabs.indexOf(itemData);

    this.tabs.splice(index, 1);
    if (index >= this.tabs.length && index > 0)
      this.selectedIndex = index - 1;
  }

  onTabDragStart(e: any) {
    e.itemData = e.fromData[e.fromIndex];
  }

  onTabDrop(e: any) {
    e.fromData.splice(e.fromIndex, 1);
    e.toData.splice(e.toIndex, 0, e.itemData);
  }

  resetTabs() {
    this.tabs = [
      {
        id: 0,
        text: 'Dashboard',
        icon: 'chart',
        page: '/dashboard'
      }
    ];
  }

  tabSelected(tabName: string) {
    // debugger;
    var tabSearch = this.tabs.find(item => item.text == tabName);
    if (tabSearch) {
      const index = this.tabs.indexOf(tabSearch);
      this.selectedIndex = index;
    }
  }

  selectTabClick(event: any) {
    //console.log(event);
    this.tabSelected(event.addedItems[0].text);
  }
}
