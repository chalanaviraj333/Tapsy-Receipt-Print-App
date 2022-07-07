import { Injectable } from '@angular/core';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';

@Injectable({
  providedIn: 'root'
})
export class PdfSerService {

  constructor(private pdfGenerator: PDFGenerator) { }

  generatePDF() {
    // this.pdfGenerator.fromURL(url, options).then(base64String => console.log(base64String));
  }

}
