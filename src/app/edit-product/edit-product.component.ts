import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { ProductService } from '../services/product.service';

import { Product } from '../model/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productID! : string;
  product! : Product
  productFormGroup!:FormGroup

  constructor(private route: ActivatedRoute,
    public prodService: ProductService,
    private fb: FormBuilder
    )
    {
    this.productID = this.route.snapshot.params['id'];
  }

  ngOnInit(){

    this.prodService.getProduct(this.productID).subscribe({
      next:(product)=>{
        this.product=product;
        this.productFormGroup = this.fb.group({
        name: this.fb.control(this.product.name, [Validators.required, Validators.minLength(5)]),
        price: this.fb.control(this.product.price, [Validators.required, Validators.min(200)]),
        promotion: this.fb.control(this.product.promotion, [Validators.required])
        })
      },
      error:(err)=>{
        console.log(err);
      }
    })

    this.handleUpdateProduct();
  }

  handleUpdateProduct(){
    let p = this.productFormGroup.value;
    p.id = this.product.id;
    this.prodService.updateProduct(p).subscribe({
      next:()=>{
        alert("Product update successfully.");
      },


      error:(err)=>{
        console.log(err);
      }

    })


  }




}
