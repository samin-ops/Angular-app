import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  productFormGroup!:FormGroup;

  constructor( private fb:FormBuilder,
    public productService: ProductService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name: this.fb.control(null, [Validators.required, Validators.minLength(5)]),
      price: this.fb.control(null, [Validators.required, Validators.min(200)]),
      promotion: this.fb.control(false, [Validators.required])
    });
  }

  handleAddProduct(){
    let prod = this.productFormGroup.value;
    this.productService.addNewProduct(prod).subscribe({
      next:()=>{
        alert("Product added successfully")
        /* this.productFormGroup.reset(); pour effacer le formulaire */
        this.router.navigateByUrl('/admin/products');

      },
      error: (err)=>{
        console.log(err);
      }
    })

  }

}
