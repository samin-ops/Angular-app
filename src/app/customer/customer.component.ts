import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers!: Customer[];
  errorMessage!: string;
  filterTerm!: string;
  customerForm! : FormGroup;

  constructor(
    private customerServices: CustomerService,
    private fb: FormBuilder,
    private routeur: Router) { }

  ngOnInit(): void {
    this.handeleGetCustomer();
    this.customerForm = this.fb.group({
      keyword:this.fb.control(null)
    })

  }

  handeleGetCustomer(){
    this.customerServices.getCustomers().subscribe({
      next: (data)=>{
        this.customers = data;
      },
      error: err=>{
        this.errorMessage = err;
      }
    });
  }

  handleDeletCustomer(c: Customer){
    let conf = confirm("Are you Sure to delete ?");
    if(!conf) return;
    this.customerServices.deleteCustomer(c.id).subscribe({
      next:()=>{
        let index = this.customers.indexOf(c);
        this.customers.splice(index, 1); // splice(debut, nbreAsupprimer)
      },
        error: err=>{
          this.errorMessage=err;
        }
    });
  }

  handleDisplayCustomer(c: Customer){
    this.routeur.navigateByUrl("/admin/displayCustomer/:id"+c.id)

  }

}
