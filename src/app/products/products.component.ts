import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../model/product.model';
import { AuthenticationService } from '../services/authentication.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products! : Product[];
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;

  errMessage! : string;
  searchFormGroup!: FormGroup;
  currentAction : string = 'all';

  constructor(private productService: ProductService, private fb: FormBuilder,
     public authenService: AuthenticationService, private router: Router) {}

  ngOnInit(){
    this.searchFormGroup = this.fb.group({
      keyword:this.fb.control(null),
    });

    this.handleGetPageProducts();
  }

  handleGetPageProducts(){
    this.productService.getPageProducts(this.currentPage, this.pageSize).subscribe({
      next: (data)=>{
        this.products = data.products;
        this.totalPages = data.totalPages;
      },
      error:(err)=>{
        this.errMessage = err;
      }
    });
  }
 // Affiche tous les produits
  handleGetAllProducts(){
    this.productService.getAllProducts().subscribe({
      next:(data)=>{
        this.products = data;
      },
      error:(err)=>{
        this.errMessage = err;
      }
    });
  }

  handleDeleteProducts(p: Product){
    let conf = confirm("Are you sure to delete ?");
    if(!conf) return; // si conf == false
    this.productService.deleteProduct(p.id).subscribe({
      next:()=>{
        let index = this.products.indexOf(p);
        this.products.splice(index, 1);
      },
      error: err=>{
        this.errMessage = err;
      }
    })

  }
  handleSetPromotion(p:Product){
    let promo = p.promotion;
    this.productService.setPromotion(p.id).subscribe({
      next:()=>{
        p.promotion =!promo; // ici il ya deux etat , soit le produit est en promo ou ne l'est pas.
      },
      error:(err)=>{
        this.errMessage = err;
      }
    })

  }

  handleSeachProducts(){
    this.currentAction = "search";
    let keyword = this.searchFormGroup.value.keyword;
    this.productService.searchProducts(keyword, this.currentPage, this.pageSize).subscribe({
      next:(data)=>{
        this.products=data.products;
        this.totalPages = data.totalPages;

      }
    })
  }
  gotoPage(i:number){
    this.currentPage = i;
    if (this.currentAction=="all")
      this.handleGetPageProducts();
    else
      this.handleSeachProducts();
  }

  handleNewProduct(){
  this.router.navigateByUrl("/admin/newProduct")

  }

  handleEditProduct(p:Product){
    this.router.navigateByUrl("/admin/editProduct/"+p.id);

  }

}
