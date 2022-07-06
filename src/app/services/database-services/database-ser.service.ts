import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReceiptDetails } from 'src/app/interfaces/receipt-details';

@Injectable({
  providedIn: 'root'
})
export class DatabaseSerService {

  constructor(private http: HttpClient) { }

  sendReceiptDataToDatabase(receiptDetails: ReceiptDetails) {

    // console.log(receiptDetails);
    this.http
      .post(
        "https://tapsy-invoice-app-default-rtdb.firebaseio.com/receipts.json",
        { ...receiptDetails, receiptID: null }
      )
      .subscribe((resData) => {
        console.log(resData);
      });
  }
}
