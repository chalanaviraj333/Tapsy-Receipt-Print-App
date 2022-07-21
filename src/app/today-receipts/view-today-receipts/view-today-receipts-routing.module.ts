import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewTodayReceiptsPage } from './view-today-receipts.page';

const routes: Routes = [
  {
    path: '',
    component: ViewTodayReceiptsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewTodayReceiptsPageRoutingModule {}
