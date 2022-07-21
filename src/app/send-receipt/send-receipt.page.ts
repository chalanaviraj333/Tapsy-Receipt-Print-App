import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Printer } from '@awesome-cordova-plugins/printer/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { ActionSheetController } from '@ionic/angular';
import { CustomerDetails } from '../interfaces/customer-details';
import { Jobitems } from '../interfaces/jobitems';
import { ReceiptDetails } from '../interfaces/receipt-details';
import { DatabaseSerService } from '../services/database-services/database-ser.service';

@Component({
  selector: 'app-send-receipt',
  templateUrl: './send-receipt.page.html',
  styleUrls: ['./send-receipt.page.scss'],
})
export class SendReceiptPage implements OnInit {

  public frontEndserviceList: Array<string> = [];
  public selectedJobType: string = 'Select Type';
  public todayDate: Date = new Date();
  public receiptServiceItems: Array<Jobitems> = [];

  public customerDetails: CustomerDetails = {customerName: '', customerPhoneNo: '', email: ''};

  public companyLogo: string = 'https://firebasestorage.googleapis.com/v0/b/tapsy-invoice-app.appspot.com/o/blackandwhite.png?alt=media&token=1c696f0a-d8dc-4a35-8b28-2b00605dc950'

  public printFile: any;
  private content: string;
  public defaultValue: number = 1;
  public receiptSubTotal: number = 0;

  constructor(public actionSheetController: ActionSheetController, public databaseService: DatabaseSerService, private pdfGenerator: PDFGenerator, private printer: Printer) { }

  ngOnInit() {
    this.databaseService.getReceiptNoFromDatabase();
    this.databaseService.getdomesticServiceListFromDatabase();
    this.databaseService.getAutomotiveServiceListFromDatabase();
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
          this.frontEndserviceList = this.databaseService.domesticServiceList;
          this.selectedJobType = 'Domestic';
        }
      }, {
        text: 'Automotive',
        icon: 'car',
        data: 10,
        handler: () => {
          this.frontEndserviceList = this.databaseService.vehicleServiceList;
          this.selectedJobType = 'Automotive';
        }
      }, {
        text: 'Other',
        icon: 'file-tray-full',
        data: 'Data value',
        handler: () => {
          this.frontEndserviceList = ['Other Services'];
          this.selectedJobType = 'Other';
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {

        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();

  }

  submitServiceAddForm(form: NgForm) {

    const newService: Jobitems = {
      jobType: this.selectedJobType,
      serviceType: form.value.serviceType,
      description: form.value.serviceDescription,
      price: form.value.servicePrice,
      qty: this.defaultValue
    }

    this.receiptSubTotal = this.receiptSubTotal + (newService.price*newService.qty);

    this.receiptServiceItems.unshift(newService);
    form.reset();

    }


    createInvoicePDF() {
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
        this.receiptSubTotal = 0;
        this.receiptServiceItems = [];
        this.databaseService.receiptNoFromDatabase.availableSaleReceiptNo++;
        this.databaseService.sendNewReceiptNoToDatabase();
      });
    }

    _printReceipt() {

      const newReceiptData: ReceiptDetails = {
        key: null,
        receiptID: this.databaseService.receiptNoFromDatabase.availableSaleReceiptNo,
        receiptdate: this.todayDate,
        customerName: this.customerDetails.customerName,
        customerPhoneNo: this.customerDetails.customerPhoneNo,
        customerEmail: this.customerDetails.email,
        jobArray: this.receiptServiceItems,
        receiptTotal: this.receiptSubTotal,
        pdfFileURL: null
      };

      this.databaseService.sendReceiptDataToDatabase(newReceiptData);
      this.createInvoicePDF();
    }

    onCLickClearAll() {
      this.customerDetails = {customerName: '', customerPhoneNo: '', email: ''};
      this.receiptServiceItems = [];
      this.receiptSubTotal = 0;

    }

    onClickDeleteService() {
      this.receiptServiceItems = [];
      this.receiptSubTotal = 0;
    }

}
