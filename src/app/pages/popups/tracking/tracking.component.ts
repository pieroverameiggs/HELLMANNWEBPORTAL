import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalTrackingService } from 'src/app/services/modal-tracking.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {

  public detailButtonOptions: any;

  constructor(
    public modalTrackingService: ModalTrackingService,
    private router: Router
  ) {

    this.detailButtonOptions = {
      icon: 'fas fa-search-plus',
      text: 'Ver Más',
      onClick(e: any) {
        console.log(e);
      },
    };

  }

  ngOnInit(): void {

  }

  popup_hiding(e: any) {
    this.modalTrackingService.hideModal();
  }

  showDetail(id: number) {
    this.modalTrackingService.hideModal();
    
    this.router.navigateByUrl('/dashboard/tracking/' + id);
  }

}
