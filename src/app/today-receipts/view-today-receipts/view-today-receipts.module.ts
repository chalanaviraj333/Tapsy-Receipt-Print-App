import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewTodayReceiptsPageRoutingModule } from './view-today-receipts-routing.module';

import { ViewTodayReceiptsPage } from './view-today-receipts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewTodayReceiptsPageRoutingModule
  ],
  declarations: [ViewTodayReceiptsPage]
})
export class ViewTodayReceiptsPageModule {}
