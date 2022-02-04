import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'Portal Customer';
  }

  public get enterprise() {
    return 'Hellmann Worldwide Logistics S.A.C.';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
