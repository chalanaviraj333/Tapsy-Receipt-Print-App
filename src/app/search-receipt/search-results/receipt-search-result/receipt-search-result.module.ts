import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceiptSearchResultPageRoutingModule } from './receipt-search-result-routing.module';

import { ReceiptSearchResultPage } from './receipt-search-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceiptSearchResultPageRoutingModule
  ],
  declarations: [ReceiptSearchResultPage]
})
export class ReceiptSearchResultPageModule {}
