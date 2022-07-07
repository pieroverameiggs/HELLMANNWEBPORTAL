import { Component, Input, OnInit } from '@angular/core';
import { TrackingWin } from 'src/app/interfaces/tracking-win.interface';

@Component({
  selector: 'app-grig-win',
  templateUrl: './grig-win.component.html',
  styleUrls: ['./grig-win.component.scss']
})
export class GrigWinComponent implements OnInit {
  
  @Input() key: string = '';
  @Input() heigthGP: number = 300;
  @Input() trackingWinTW: TrackingWin[] = [];
  @Input() airSeaPortLabelTW: string = '';
  @Input() transportSeaPortLabelTW: string = '';
  @Input() showEventStatus: any;

  constructor() { 
    
  }

  ngOnInit(): void {
    this.trackingWinTW = this.trackingWinTW.filter(container => container.VCH_SEARCHVALUEWIN==this.key);    
  }

}
