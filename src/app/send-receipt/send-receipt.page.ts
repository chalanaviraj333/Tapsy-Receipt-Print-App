import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Printer } from '@awesome-cordova-plugins/printer/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Jobitems } from '../interfaces/jobitems';
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

  public defaultValue: number = 1;

  public companyLogo: string = 'https://firebasestorage.googleapis.com/v0/b/tapsy-invoice-app.appspot.com/o/blackandwhite.png?alt=media&token=1c696f0a-d8dc-4a35-8b28-2b00605dc950'

  public receiptServiceItems: Array<Jobitems> = [{description: 'car key replacement', price: 290},{description:'locked out', price: 120}];

  public printFile: any;

  private content: string;

  public printReceiptDetails: ReceiptDetails = {receiptID: null, date: new Date(), jobType: '', serviceType: '', price: 0, customerName: '', customerPhoneNo: '', customerEmail: ''}

  constructor(public actionSheetController: ActionSheetController, private databaseService: DatabaseSerService, private pdfGenerator: PDFGenerator, private printer: Printer) { }

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

    this.printReceiptDetails = newReceiptData;
    this.databaseService.sendReceiptDataToDatabase(newReceiptData);
    this.downloadInvoice();

    }


    downloadInvoice() {
      this.content = document.getElementById('PrintInvoice').innerHTML;
      let options = {
        documentSize: 'A4',
        // type: 'share',
        // landscape: 'portrait',
        fileName: 'Sale-Receipt.pdf'
      };

      this.pdfGenerator.fromData(this.content, options)
        .then((base64) => {
          this.printFile = base64;
          this._onClickPrintInstrauctions();
        }).catch((error) => {
          console.log('error', error);
        });

    }


    _onClickPrintInstrauctions() {

      this.printer.print(`base64://${this.printFile}`).then(onSuccess => {
        console.log('send to printer')
      });
    }

}
