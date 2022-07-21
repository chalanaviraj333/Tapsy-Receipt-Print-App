import { Jobitems } from "./jobitems";

export interface ReceiptDetails {
  key: string;
  receiptID: number;
  receiptdate: Date;
  customerName: string;
  customerPhoneNo: string;
  customerEmail: string;
  jobArray: Array<Jobitems>;
  receiptTotal: number;
  pdfFileURL: string;
}
