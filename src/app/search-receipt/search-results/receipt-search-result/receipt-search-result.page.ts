import { Component, OnInit } from '@angular/core';
import { ReceiptDetails } from 'src/app/interfaces/receipt-details';
import { DatabaseSerService } from 'src/app/services/database-services/database-ser.service';
import { ModelViewService } from 'src/app/services/model-services/model-view.service';

@Component({
  selector: 'app-receipt-search-result',
  templateUrl: './receipt-search-result.page.html',
  styleUrls: ['./receipt-search-result.page.scss'],
})
export class ReceiptSearchResultPage implements OnInit {

  constructor(public databaseService: DatabaseSerService, private modelService: ModelViewService) { }

  ngOnInit() {
  }

  onClickViewReceipt(selectedReceipt: ReceiptDetails) {

    this.modelService.onClickViewReceipt(selectedReceipt);
  }

}
