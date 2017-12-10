import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class InvoicesServices {
    invoicedata: Invoicedata[];

    constructor(private http: Http) {
        console.log('Invoices Services Initialized');
    }

    getAllBranchInvoices() {

        let url = 'http://localhost:3000/invoices';

        let header : Headers = new Headers({
          'Content-type':'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("myToken")
        });

        let options = new RequestOptions({headers: header});

        return this.http.get(url, options)
            .map(res => res.json());
    }

    getBranchInvoices(branch_id: number) {

        let url = 'http://localhost:3000/invoices/' + branch_id;

      let header : Headers = new Headers({
        'Content-type':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("myToken")
      });

      let options = new RequestOptions({headers: header});

        return this.http.get(url, options)
            .map(res => res.json());
    }

    createNewInvoice(invoice_id: number, date: string, branch_id: number, invoice: Invoicedata[], total_invoice_price: number, total_invoice_items: number, username: string) {
        let url = 'http://localhost:3000/invoices/create';

      let header : Headers = new Headers({
        'Content-type':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("myToken")
      });

      let options = new RequestOptions({headers: header});

        let jsonsend = {
            invoice_id: invoice_id,
            date: date,
            branch_id: branch_id,
            invoice: invoice,
            total_invoice_price: total_invoice_price,
            total_invoice_items: total_invoice_items,
            username: username
        };

        return this.http.post(url, jsonsend, options)
            .map(res => res.json());
    }

    getInvoiceDetail(i_id: number) {

        let url = 'http://localhost:3000/invoices/get_invoice_detail';

      let header : Headers = new Headers({
        'Content-type':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("myToken")
      });

      let options = new RequestOptions({headers: header});

        let jsonsend = {
            invoice_id: i_id
        };

        return this.http.post(url, jsonsend, options)
            .map(res => res.json());
    }

    deleteInvoice(i_id: number) {

        let url = 'http://localhost:3000/invoices/' + i_id + '/delete';
      let header : Headers = new Headers({
        'Content-type':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("myToken")
      });

      let options = new RequestOptions({headers: header});

        return this.http.delete(url, options)
            .map(res => res.json());
    }

    deleteAllInvoices() {

        let url = 'http://localhost:3000/invoices/delete_all';

      let header : Headers = new Headers({
        'Content-type':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("myToken")
      });

      let options = new RequestOptions({headers: header});

        return this.http.delete(url, options)
            .map(res => res.json());
    }

    editInvoice(invoice_id: number, date: string, branch_id: number, invoice: Invoicedata[], total_invoice_price: number, total_invoice_items: number, username: number) {

        let url = 'http://localhost:3000/invoices/edit_invoice';

      let header : Headers = new Headers({
        'Content-type':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("myToken")
      });

      let options = new RequestOptions({headers: header});

        // INCOMPLETE API

        let jsonsend = {
            invoice_id: invoice_id,
            date: date,
            branch_id: branch_id,
            invoice: invoice,
            total_invoice_price: total_invoice_price,
            total_invoice_items: total_invoice_items,
            username: username
        };

        return this.http.patch(url, jsonsend, options)
            .map(res => res.json());
    }


    getBranchProductsAvailablity(b_id: number, p_id: number, p_qty: number) {

        let url = 'http://localhost:3000/invoices/branch_product';

      let header : Headers = new Headers({
        'Content-type':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("myToken")
      });

      let options = new RequestOptions({headers: header});

        let jsonsend = {
            branch_id: b_id,
            product_id: p_id,
            product_qty: p_qty
        };

        return this.http.post(url, jsonsend, options)
            .map(res => res.json());
    }

}

interface Invoicedata {
    productid: number;
    quantities: number;
    product_unit_price: number;
}
