import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestPrintingPage } from './test-printing.page';

const routes: Routes = [
  {
    path: '',
    component: TestPrintingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestPrintingPageRoutingModule {}
