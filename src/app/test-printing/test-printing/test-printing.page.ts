import { Component, Input, OnInit } from '@angular/core';
import { Printer, PrintOptions } from '@awesome-cordova-plugins/printer/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { ModalController } from '@ionic/angular';
import { Jobitems } from 'src/app/interfaces/jobitems';



@Component({
  selector: 'app-test-printing',
  templateUrl: './test-printing.page.html',
  styleUrls: ['./test-printing.page.scss'],
})
export class TestPrintingPage implements OnInit {

  public companyLogo: string = 'https://firebasestorage.googleapis.com/v0/b/tapsy-invoice-app.appspot.com/o/blackandwhite.png?alt=media&token=1c696f0a-d8dc-4a35-8b28-2b00605dc950'

  public receiptServiceItems: Array<Jobitems> = [{description: 'car key replacement', price: 290},{description:'locked out', price: 120}];


//   constructor(private printer: Printer) { }

//   ngOnInit() {
//   }

//   _onClickPrintInstrauctions() {

//     // let printcontent: string = 'Chalana';

//     let printcontent: string = '<header>'

//     this.printer.print(printcontent, this.options).then(onSuccess => {
//       console.log('send to printer')
//     });
//   }

  public printFile: any;

  content: string;
  constructor( private pdfGenerator: PDFGenerator, private printer: Printer) {
  }


  downloadInvoice() {
    this.content = document.getElementById('PrintInvoice').innerHTML;
    let options = {
      documentSize: 'A4',
      // type: 'share',
      // landscape: 'portrait',
      fileName: 'Order-Invoice.pdf'
    };

    this.pdfGenerator.fromData(this.content, options)
      .then((base64) => {
        this.printFile = base64;
        this._onClickPrintInstrauctions();
      }).catch((error) => {
        console.log('error', error);
      });

  }
  ngOnInit() {
  }

    _onClickPrintInstrauctions() {

    this.printer.print(`base64://${this.printFile}`).then(onSuccess => {
      console.log('send to printer')
    });
  }

}
