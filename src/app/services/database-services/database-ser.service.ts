import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReceiptDetails } from 'src/app/interfaces/receipt-details';
import { SearchEntry } from 'src/app/interfaces/search-entry';

export interface AvailReceiptNo {
  key: string;
  availableSaleReceiptNo: number;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseSerService {

  public receiptNoFromDatabase: AvailReceiptNo = {key: null, availableSaleReceiptNo: 1 };
  public domesticServiceList: Array<string> = [];
  public vehicleServiceList: Array<string> = [];

  public todaysReceipts: Array<ReceiptDetails> = [];
  private todayDate: Date = new Date();
  private AllReceiptArray: Array<ReceiptDetails> = [];
  public filterdReceipts: Array<ReceiptDetails> = [];

  constructor(private http: HttpClient) { }

  sendReceiptDataToDatabase(receiptDetails: ReceiptDetails) {

    this.http
      .post(
        "https://tapsy-invoice-app-default-rtdb.firebaseio.com/receipts.json",
        { ...receiptDetails, key: null }
      )
      .subscribe((resData) => {

      });
  }

  getReceiptNoFromDatabase() {
    this.http.get('https://tapsy-invoice-app-default-rtdb.firebaseio.com/sale-receipt-avail-number.json')
      .subscribe(resData => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)){
              this.receiptNoFromDatabase.key = key,
              this.receiptNoFromDatabase.availableSaleReceiptNo = resData[key].availableSaleReceiptNo;
          }

        }

    });
  }

  sendNewReceiptNoToDatabase() {
    this.http
        .put(
          `https://tapsy-invoice-app-default-rtdb.firebaseio.com/sale-receipt-avail-number/${this.receiptNoFromDatabase.key}.json`,
          { ...this.receiptNoFromDatabase, key: null }
        )
        .subscribe((resData) => {

        });
  }

  getdomesticServiceListFromDatabase() {
    this.domesticServiceList = [];

    this.http.get('https://tapsy-invoice-app-default-rtdb.firebaseio.com/domestic-service-items.json')
      .subscribe(resData => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)){
              this.domesticServiceList.push(resData[key].itemname);
          }
        }
    });
  }

  getAutomotiveServiceListFromDatabase() {
    this.vehicleServiceList = [];
    this.http.get('https://tapsy-invoice-app-default-rtdb.firebaseio.com/automotive-service-items.json')
      .subscribe(resData => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)){
              this.vehicleServiceList.push(resData[key].itemname);
          }
        }
    });
  }

  // get all receipts from database
  getAllReceiptsFromDatabase() {
    this.AllReceiptArray = [];

    this.http.get<{ [key: string]: ReceiptDetails }>('https://tapsy-invoice-app-default-rtdb.firebaseio.com/receipts.json')
      .subscribe(resData => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)){
            this.AllReceiptArray.push({
              key: key,
              receiptID: resData[key].receiptID,
              receiptdate: new Date(resData[key].receiptdate),
              customerName: resData[key].customerName,
              customerPhoneNo: resData[key].customerPhoneNo,
              customerEmail: resData[key].customerEmail,
              jobArray: resData[key].jobArray,
              receiptTotal: resData[key].receiptTotal,
              pdfFileURL: resData[key].pdfFileURL
            });
          }
        }
    });
  }

  // todays page

  gettodaysReceiptsArray() {
    this.todaysReceipts = [];

    this.http.get<{ [key: string]: ReceiptDetails }>('https://tapsy-invoice-app-default-rtdb.firebaseio.com/receipts.json')
    .subscribe(resData => {
      for (const key in resData) {
        if (resData.hasOwnProperty(key)){
            if (new Date(resData[key].receiptdate).getDate() == this.todayDate.getDate() && new Date(resData[key].receiptdate).getMonth() == this.todayDate.getMonth() && new Date(resData[key].receiptdate).getFullYear() == this.todayDate.getFullYear()) {
              this.todaysReceipts.push({
                key: key,
                receiptID: resData[key].receiptID,
                receiptdate: new Date(resData[key].receiptdate),
                customerName: resData[key].customerName,
                customerPhoneNo: resData[key].customerPhoneNo,
                customerEmail: resData[key].customerEmail,
                jobArray: resData[key].jobArray,
                receiptTotal: resData[key].receiptTotal,
                pdfFileURL: resData[key].pdfFileURL
              });
            }
        }
      }
  });
  }

  searchReceipt(enteredDetails: SearchEntry) {
    this.filterdReceipts = this.AllReceiptArray;

    if (enteredDetails.receiptID != '') {
      this.filterdReceipts = this.filterdReceipts.filter(receipt => (receipt.receiptID).toString() === enteredDetails.receiptID);
    }
    if (enteredDetails.customerName != '') {
      this.filterdReceipts = this.filterdReceipts.filter(receipt => {
        let searchWord = receipt.customerName;
        return searchWord.toLowerCase().indexOf(enteredDetails.customerName.toLowerCase()) > -1;
      });
    }
    if (enteredDetails.customerPhone != '') {
      this.filterdReceipts = this.filterdReceipts.filter(receipt => receipt.customerPhoneNo === enteredDetails.customerPhone);
    }
    if (enteredDetails.customerEmail != '') {
      this.filterdReceipts = this.filterdReceipts.filter(receipt => receipt.customerEmail === enteredDetails.customerEmail);
    }
    if (enteredDetails.selectedDate != null) {

      this.filterdReceipts = this.filterdReceipts.filter(receipt => ((new Date(receipt.receiptdate).getDate() === new Date(enteredDetails.selectedDate).getDate()) && (new Date(receipt.receiptdate).getMonth() === new Date(enteredDetails.selectedDate).getMonth()) && (new Date(receipt.receiptdate).getFullYear() === new Date(enteredDetails.selectedDate).getFullYear())));
    }

  }

}
