import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestPrintingPageRoutingModule } from './test-printing-routing.module';

import { TestPrintingPage } from './test-printing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestPrintingPageRoutingModule
  ],
  declarations: [TestPrintingPage]
})
export class TestPrintingPageModule {}
