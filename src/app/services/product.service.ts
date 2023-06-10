import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { PageProducts, Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products!: Product[]; // appel de l'interface product.model.ts

  constructor() {

    this.products = [
      {id:UUID.UUID(), name:"Computeur", price:65000, promotion:true},
      {id:UUID.UUID(), name:"Printer", price:15000, promotion:false},
      {id:UUID.UUID(), name:"Smart Phone", price:12000, promotion:true},
      {id:UUID.UUID(), name:"Chargeur", price:50000, promotion:false},
      {id:UUID.UUID(), name:"Iron", price:100000, promotion:true},
    ];

    for(let i=0; i<10; i++){
      this.products.push({id:UUID.UUID(), name:"Computeur", price:65000, promotion:true});
      this.products.push({id:UUID.UUID(), name:"Smart Phone", price:12000, promotion:true});
      this.products.push({id:UUID.UUID(), name:"Computeur", price:65000, promotion:true});
    }
  }

   public getAllProducts():Observable<Product[]>{
    let rnd = Math.random();
    if(rnd < 0.1){
      return throwError(()=> new Error("Internet connection issue ⛔️"));
    }else{
      return of([...this.products]); // Une copies des donnees de this.products
    }
   }

   public getPageProducts(page:number, size:number):Observable<PageProducts>{
    let index = page * size;
    let totalPages = ~~(this.products.length / size); // ~~ division entiere.
    if(this.products.length % size != 0)
      totalPages ++;
    let pageProducts= this.products.slice(index, index+size);
    return of({page: page, size:size, totalPages:totalPages, products: pageProducts})
   }

   public deleteProduct(id : string): Observable<boolean>{
    this.products = this.products.filter(p => p.id != id);
    return of(true);
   }

  public setPromotion(id: string): Observable<boolean>{
    let product= this.products.find(p => p.id==id);
    if(product!= undefined){
      product.promotion =!product.promotion; // le produit est en promotion ou n'est pas en promotion.
      return of(true);
    }else return throwError(()=> new Error("Product not found"));

  }
  public searchProducts(keyword: string, page: number, size: number):Observable<PageProducts>{
    let results = this.products.filter(p => p.name.includes(keyword));// on cherche les produits dont le nom contient le keyword.
    let index = page * size;
    let totalPages = ~~(results.length / size); // ~~ division entiere.
    if(this.products.length % size !=0){
      totalPages ++;
    }
    let pageProducts = results.slice(index, index+size);
    return of({page: page, size:size, totalPages:totalPages, products: pageProducts})
  }

  public addNewProduct(product: Product):Observable<Product>{
    product.id = UUID.UUID();
    this.products.push(product); // ajouter un nouvau produit
    return of(product);

  }

  public getProduct(id: string): Observable<Product>{
    let product = this.products.find(p => p.id==id);
    if(product==undefined){
      return throwError(()=> Error("product not found"));
    }else{
      return of(product);
    }
  }

  public updateProduct(product: Product):Observable<Product>{
      this.products = this.products.map(p=>(p.id==product.id)?product:p);
      return of(product);

  }



  public getErrorMessage(fieldName:string, error:ValidationErrors){
    if(error['required']){
      return fieldName +"is Required ";
    }
    else if(error['minLength']){
      return fieldName + `should have at least  ${error['minLength']['requiredLength']} Characters.`;
    }
    else if(error['min']){
      return fieldName + `should have min value ${error['min']['min']}.`;
    }
    else{
      return "";
    }

  }

}
