import { Component, Input, OnInit } from '@angular/core';
import { Printer } from '@awesome-cordova-plugins/printer/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { ModalController } from '@ionic/angular';
import { ReceiptDetails } from 'src/app/interfaces/receipt-details';

@Component({
  selector: 'app-receipt-more-view',
  templateUrl: './receipt-more-view.page.html',
  styleUrls: ['./receipt-more-view.page.scss'],
})
export class ReceiptMoreViewPage implements OnInit {

  @Input() selectedReceipt : ReceiptDetails;

  public printFile: any;
  private content: string;
  public companyLogo: string = 'https://firebasestorage.googleapis.com/v0/b/tapsy-invoice-app.appspot.com/o/blackandwhite.png?alt=media&token=1c696f0a-d8dc-4a35-8b28-2b00605dc950'



  constructor(private modalController: ModalController, private pdfGenerator: PDFGenerator, private printer: Printer) { }

  ngOnInit() {

  }

  _onClickDismiss() {
    this.modalController.dismiss();
  }

  printReceipt() {
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

    });
  }

}
