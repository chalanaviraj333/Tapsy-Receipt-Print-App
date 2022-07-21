import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceiptMoreViewPage } from './receipt-more-view.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiptMoreViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiptMoreViewPageRoutingModule {}
