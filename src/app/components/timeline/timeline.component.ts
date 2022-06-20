import { Component, Input, OnInit } from '@angular/core';
import { TrackingModal } from 'src/app/interfaces/tracking-modal.interface';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @Input() trackingModalTL: TrackingModal[] = [];
  @Input() trackingModalSelectTL: TrackingModal = {} as TrackingModal
  @Input() way: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
