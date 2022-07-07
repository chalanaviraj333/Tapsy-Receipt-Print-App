import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoiceViewPageRoutingModule } from './invoice-view-routing.module';

import { InvoiceViewPage } from './invoice-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoiceViewPageRoutingModule
  ],
  declarations: [InvoiceViewPage]
})
export class InvoiceViewPageModule {}
