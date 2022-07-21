import { Component, OnInit } from '@angular/core';
import { ReceiptDetails } from 'src/app/interfaces/receipt-details';
import { DatabaseSerService } from 'src/app/services/database-services/database-ser.service';
import { ModelViewService } from 'src/app/services/model-services/model-view.service';

@Component({
  selector: 'app-view-today-receipts',
  templateUrl: './view-today-receipts.page.html',
  styleUrls: ['./view-today-receipts.page.scss'],
})
export class ViewTodayReceiptsPage implements OnInit {

  constructor(public databaseService: DatabaseSerService, private modelService: ModelViewService) { }

  ngOnInit() {
    this.databaseService.gettodaysReceiptsArray();
  }

  onClickViewReceipt(selectedReceipt: ReceiptDetails) {


    this.modelService.onClickViewReceipt(selectedReceipt);
  }

}
