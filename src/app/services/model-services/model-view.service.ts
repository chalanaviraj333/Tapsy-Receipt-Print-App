import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReceiptDetails } from 'src/app/interfaces/receipt-details';
import { ReceiptMoreViewPage } from 'src/app/model-pages/receipt-view-page/receipt-more-view/receipt-more-view.page';

@Injectable({
  providedIn: 'root'
})
export class ModelViewService {

  constructor(public modalController: ModalController) { }

  async onClickViewReceipt(selectedReceipt: ReceiptDetails) {
    const modal = await this.modalController.create({
      component: ReceiptMoreViewPage,
      componentProps: {
        "selectedReceipt": selectedReceipt
      },
      cssClass: 'view-Receipt-Details-class',
      swipeToClose: true,
    });
    return await modal.present();
  }
}
