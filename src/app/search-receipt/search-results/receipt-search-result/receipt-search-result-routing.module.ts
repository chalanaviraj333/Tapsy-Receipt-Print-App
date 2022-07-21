import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceiptSearchResultPage } from './receipt-search-result.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiptSearchResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiptSearchResultPageRoutingModule {}
