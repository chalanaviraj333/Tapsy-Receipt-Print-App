import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchEntry } from 'src/app/interfaces/search-entry';
import { DatabaseSerService } from 'src/app/services/database-services/database-ser.service';

@Component({
  selector: 'app-search-receipt',
  templateUrl: './search-receipt.page.html',
  styleUrls: ['./search-receipt.page.scss'],
})
export class SearchReceiptPage implements OnInit {

  public todayDate: Date = new Date()
  public selectedDate: Date = new Date();

  @ViewChild('datetime') datetime;

  constructor(private databaseService: DatabaseSerService, private router: Router) { }

  ngOnInit() {
    this.databaseService.getAllReceiptsFromDatabase();
  }

  onSubmitSearchForm(form: NgForm) {
    if (form.value.selectedDate == '') {
      const enteredDetails: SearchEntry = {
        receiptID: (form.value.selectedReceiptID),
        customerName: form.value.selectedCustomerName,
        customerPhone: form.value.selectedCustomerPhone,
        customerEmail: form.value.selectedCustomerEmail,
        selectedDate: null
      }
      this.databaseService.searchReceipt(enteredDetails);
      this.router.navigateByUrl('search-receipt/receipt-search-result');
    }
    else {
      const enteredDetails: SearchEntry = {
        receiptID: form.value.selectedReceiptID,
        customerName: form.value.selectedCustomerName,
        customerPhone: form.value.selectedCustomerPhone,
        customerEmail: form.value.selectedCustomerEmail,
        selectedDate: new Date(form.value.selectedDate)
      }
      this.databaseService.searchReceipt(enteredDetails);
      this.router.navigateByUrl('search-receipt/receipt-search-result');
    }

  }

  resetDate(form: NgForm) {
    form.reset();
    this.datetime.reset();
  }
}
