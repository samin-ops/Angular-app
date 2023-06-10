import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
   customers!: Customer[];

  constructor() {
    this.customers = [
      {id:UUID.UUID(), nom:"Bernard", qte: 2, produits:"ordinateur", priUnitaire:500, prixTotal:100},
      {id:UUID.UUID(), nom:"Okeu Henri J.", qte: 3, produits:"Table", priUnitaire:1000, prixTotal: 3000 },
      {id:UUID.UUID(), nom:"salomon", qte: 2, produits:"ordinateur", priUnitaire:500, prixTotal: 100 },
    ];

    for(let i=0; i<10; i++){
      this.customers.push({id:UUID.UUID(), nom:"Bernard", qte: 2, produits:"ordinateur", priUnitaire:500, prixTotal:100});
      this.customers.push({id:UUID.UUID(), nom:"Samin", qte: 3, produits:"ordinateur", priUnitaire:1000, prixTotal:3000});
      this.customers.push({id:UUID.UUID(), nom:"Serge", qte: 2, produits:"Video", priUnitaire:400, prixTotal:8000});
      this.customers.push({id:UUID.UUID(), nom:"Aaron", qte: 5, produits:"ordinateur", priUnitaire:500, prixTotal:2500});

    }
  }


  public getCustomers():Observable<Customer[]>{
    let rnd = Math.random();
    if(rnd<0.1){
      return throwError(()=> new Error("Internet issued, try later"));
    }else{
      return of([...this.customers]);
    }

  }

  public deleteCustomer(id: string):Observable<boolean>{
    this.customers = this.customers.filter(c=>c.id != id);
      return of(true);

  }

public getOneCustomer(id: string): Observable<Customer>{
   let customer = this.customers.find(c=>c.id==id);
  if(customer==undefined){
    return throwError(()=>Error("Customer not found"));

  }else{
    return of(customer);
  }

}

public updateCustomer(customers: Customer):Observable<Customer>{
  this.customers = this.customers.map(c=>(c.id==customers.id)?customers:c);
  return of(customers);

}

public getErrorMessage(fieldName: string, error: ValidationErrors){
  if(error['required']){
    return fieldName +"is Required ";
  }
  else if(error['minLength']){
    return fieldName +"should have least " + error['minLength']['requiredLength']+ "Characters. ";
  }
  else if(error['min']){
    return fieldName +"should have min value " + error['min']['min'];
  }
  else{
    return "";
  }

}





}


