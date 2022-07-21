import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceiptMoreViewPageRoutingModule } from './receipt-more-view-routing.module';

import { ReceiptMoreViewPage } from './receipt-more-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceiptMoreViewPageRoutingModule
  ],
  declarations: [ReceiptMoreViewPage]
})
export class ReceiptMoreViewPageModule {}
