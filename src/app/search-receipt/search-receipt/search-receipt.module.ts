import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchReceiptPageRoutingModule } from './search-receipt-routing.module';

import { SearchReceiptPage } from './search-receipt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchReceiptPageRoutingModule
  ],
  declarations: [SearchReceiptPage]
})
export class SearchReceiptPageModule {}
