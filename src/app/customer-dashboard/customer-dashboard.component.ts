import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api-service.service';
import { CustomerModel } from '../model/customer-dash board.model';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';

declare let alertify: any;

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],
})
export class CustomerDashboardComponent implements OnInit {
  formValue!: FormGroup;
  customerModelObj: CustomerModel = new CustomerModel();
  customerData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  filterText = '';
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  phoneNumbers = [];

  // Enter, comma
  // separatorKeysCodes = [ENTER, COMMA];

  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private authentication: AuthenticationService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      address: [''],
    });
    this.getAllCustomer();
  }
  public customerProperty = [{}];

  add(event): void {
    let input = event.input;
    let value = event.value;

    // Add our keyword
    if ((value || '').trim()) {
      this.phoneNumbers.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  remove(keyword: any): void {
    let index = this.phoneNumbers.indexOf(keyword);

    if (index >= 0) {
      this.phoneNumbers.splice(index, 1);
    }
  }
  clickAddCustomer() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postCustomerDetails() {
    this.customerModelObj.firstName = this.formValue.value.firstName;
    this.customerModelObj.lastName = this.formValue.value.lastName;
    this.customerModelObj.email = this.formValue.value.email;
    this.customerModelObj.mobile = this.formValue.value.mobile;
    this.customerModelObj.address = this.formValue.value.address;

    this.api.postCustomer(this.customerModelObj).subscribe(
      (res) => {
        console.log(res);
        // alert('Customer Added Successfully!');
        alertify.success('Customer Added Successfully!');

        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllCustomer();
      },
      (err) => {
        //alert('Something went wrong!');
        alertify.error('Something went wrong!');
      }
    );
  }

  getAllCustomer() {
    this.api.getCustomer().subscribe((res) => {
      this.customerData = res;
    });
  }

  deleteCustomer(row: any) {
    this.api.deleteCustomer(row.id).subscribe((res) => {
      //alert('Customer deleted!');
      alertify.success('Customer deleted!');

      this.getAllCustomer();
    });
  }
  onEdit(row: any) {
    this.customerModelObj.id = row.id;
    console.log(this.customerModelObj.id);
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['address'].setValue(row.address);
    this.showAdd = false;
    this.showUpdate = true;
  }

  updateCustomerDetails() {
    this.customerModelObj.firstName = this.formValue.value.firstName;
    this.customerModelObj.lastName = this.formValue.value.lastName;
    this.customerModelObj.email = this.formValue.value.email;
    this.customerModelObj.mobile = this.formValue.value.mobile;
    this.customerModelObj.address = this.formValue.value.address;

    this.api
      .updateCustomer(this.customerModelObj, this.customerModelObj.id)
      .subscribe((res) => {
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllCustomer();
        delay(5000);
      });
    alertify.success('Updated Successfully!');

    setTimeout(() => {
      window.location.reload();
    }, 1000);
    // alert('Updated Successfully!');
  }
  logout() {
    this.authentication.logOut();
  }
  detailRoute() {
    this.route.navigate(['detail']);
  }
}
