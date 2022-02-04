import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-indicator',
  templateUrl: './load-indicator.component.html',
  styleUrls: ['./load-indicator.component.scss']
})
export class LoadIndicatorComponent implements OnInit {

  @Input() isLoadIndicatorVisible: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
