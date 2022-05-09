import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalEventService } from 'src/app/services/modal-event.service';

@Component({
  selector: 'app-trackingevent',
  templateUrl: './trackingevent.component.html',
  styleUrls: ['./trackingevent.component.scss']
})
export class TrackingeventComponent implements OnInit {

  public detailButtonOptions: any;

  constructor(
    public modalEventService: ModalEventService,
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
    this.modalEventService.hideModal();
  }

  showDetail(id: number, entity: number, system: string, table: string) {
    this.modalEventService.showLoading();
    this.modalEventService.hideModal();
    if (table == 'OPE')
      this.router.navigate(['/dashboard/operation/' + id], { queryParams: { system, entity } });
    else if (table == 'CUSTOMS')
      this.router.navigate(['/dashboard/customs/' + id], { queryParams: { system, entity } });
  }  

}
