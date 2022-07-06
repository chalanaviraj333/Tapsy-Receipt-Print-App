import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { ReceiptDetails } from '../interfaces/receipt-details';
import { DatabaseSerService } from '../services/database-services/database-ser.service';

@Component({
  selector: 'app-send-receipt',
  templateUrl: './send-receipt.page.html',
  styleUrls: ['./send-receipt.page.scss'],
})
export class SendReceiptPage implements OnInit {

  public serviceList: Array<string> = [];
  private domesticServiceList: Array<string> = ['Lock Rekey', 'Lock Repair', 'Lock Supply', 'Other'];
  private vehicleServiceList: Array<string> = ['Spare Remote', 'Spare Normal Key', 'Spare Remote AM', 'Door Lock Rekey', 'Ignition Repair', 'Roof Rack Key Cut', 'Gaining Entry', 'Other'];
  private selectedJobType: string = '';
  public todayDate: Date = new Date();

  constructor(public actionSheetController: ActionSheetController, private databaseService: DatabaseSerService) { }

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
          this.selectedJobType = 'Domestic';
        }
      }, {
        text: 'Vehicle',
        icon: 'car',
        data: 10,
        handler: () => {
          this.serviceList = this.vehicleServiceList;
          this.selectedJobType = 'Automotive';
        }
      }, {
        text: 'Other',
        icon: 'file-tray-full',
        data: 'Data value',
        handler: () => {
          this.serviceList = [];
          this.selectedJobType = 'Other';
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

    const newReceiptData: ReceiptDetails = {
      receiptID: null,
      date: new Date(),
      jobType: this.selectedJobType,
      serviceType: form.value.serviceType,
      price: form.value.receiptPrice,
      customerName: form.value.customerName,
      customerPhoneNo: form.value.phoneNo,
      customerEmail: form.value.cusomteremail
    };

    this.databaseService.sendReceiptDataToDatabase(newReceiptData);

    }

}
