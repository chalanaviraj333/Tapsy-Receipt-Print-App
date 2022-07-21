import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchReceiptPage } from './search-receipt.page';

const routes: Routes = [
  {
    path: '',
    component: SearchReceiptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchReceiptPageRoutingModule {}
