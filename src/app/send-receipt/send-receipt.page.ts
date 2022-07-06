import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { ReceiptDetails } from '../interfaces/receipt-details';

@Component({
  selector: 'app-send-receipt',
  templateUrl: './send-receipt.page.html',
  styleUrls: ['./send-receipt.page.scss'],
})
export class SendReceiptPage implements OnInit {

  public receiptDetails: ReceiptDetails = {receiptID: 0, date: new Date(), jobType: '', ServiceType: '', Price: 0, customername: '', customerPhoneNo: ''};
  public serviceList: Array<string> = [];
  private domesticServiceList: Array<string> = ['Lock Rekey', 'Lock Repair', 'Lock Supply', 'Other'];
  private vehicleServiceList: Array<string> = ['Spare Remote', 'Spare Normal Key', 'Spare Remote AM', 'Door Lock Rekey', 'Ignition Repair', 'Roof Rack Key Cut', 'Gaining Entry', 'Other'];

  constructor(public actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Job Types',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Domestic',
        role: 'destructive',
        icon: 'home',
        id: 'domestic-button',
        data: {
          type: 'delete'
        },
        handler: () => {
          this.serviceList = this.domesticServiceList;
        }
      }, {
        text: 'Vehicle',
        icon: 'car',
        data: 10,
        handler: () => {
          this.serviceList = this.vehicleServiceList;
        }
      }, {
        text: 'Other',
        icon: 'file-tray-full',
        data: 'Data value',
        handler: () => {
          this.serviceList = [];
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

  onSubmit(form: NgForm) {
    // const newCarNote: CarNote = {
    //   brand: this.selectedCar.carbrand,
    //   userename: this.username,
    //   model: this.selectedCar.model,
    //   selectedyear: this.selectedCar.selectedyear,
    //   carnotesDescription: form.value.carnote,
    //   date: new Date(),
    // };

    // this.databaseService.addtonotes(newCarNote);
    // this.modalController.dismiss();
  }

}
