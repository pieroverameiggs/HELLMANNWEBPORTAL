import { Component, Input, OnInit } from '@angular/core';
import { TrackingWin } from 'src/app/interfaces/tracking-win.interface';

@Component({
  selector: 'app-grig-win',
  templateUrl: './grig-win.component.html',
  styleUrls: ['./grig-win.component.scss']
})
export class GrigWinComponent implements OnInit {

  @Input() trackingWinTW: TrackingWin[] = [];
  @Input() airSeaPortLabelTW: string = '';
  @Input() transportSeaPortLabelTW: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
