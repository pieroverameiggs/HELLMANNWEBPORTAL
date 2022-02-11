import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'Customer Portal';
  }

  public get enterprise() {
    return 'Hellmann Worldwide Logistics S.A.C.';
  }

  public get entityUser(){
    const entity = JSON.parse(localStorage.getItem('entity')||'{}');
    return `RUC: ${entity.VCH_DOI} - ${entity.VCH_BUSINESSNAME}`;
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
