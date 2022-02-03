import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'PCUSTOMER01 L01 Spa';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
