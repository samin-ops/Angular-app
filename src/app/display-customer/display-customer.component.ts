import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-display-customer',
  templateUrl: './display-customer.component.html',
  styleUrls: ['./display-customer.component.css']
})
export class DisplayCustomerComponent implements OnInit {

  customerID!: string;
  customer!:Customer;
  customerFormGroup!: FormGroup

  constructor(private route:ActivatedRoute, public customerService: CustomerService, private fb: FormBuilder) {
    this.customerID = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.customerService.getOneCustomer(this.customerID).subscribe({
      next:(customer)=>{
        this.customer=customer;
          this.customerFormGroup = this.fb.group({
            name: this.fb.control(this.customer.nom,[Validators.required, Validators.minLength(5)]),
            products: this.fb.control(this.customer.produits, [Validators.required, Validators.minLength(5)]),
            qte: this.fb.control(this.customer.qte, [Validators.required, Validators.min(3)]),
            prixUnitaire: this.fb.control(this.customer.priUnitaire, [Validators.required, Validators.min(200)]),
            prixTotal: this.fb.control(this.customer.prixTotal,[Validators.required, Validators.min(0)])
          });
      },

    })

  }
  handleCustomerUpdate(){
    console.log(this.customerFormGroup.value);

    let c = this.customerFormGroup.value;
    c.id = this.customer.id;
    this.customerService.updateCustomer(c).subscribe({
      next:()=>{
        alert("Customer is successfully updated.");
      },
      error: err=>{
        console.log(err);

      }
    })

  }




}
