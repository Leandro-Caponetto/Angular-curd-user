import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  produtURL = "http://localhost:8080/product";

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.produtURL);
  }

  public detail(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.produtURL + `/${id}`);
  }

  public create(product: Product): Observable<any>{
    return this.httpClient.post<any>(this.produtURL, product);
  }

  public update(id: number, product: Product): Observable<any>{
    return this.httpClient.put<any>(this.produtURL + `/${id}`, product);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.produtURL + `/${id}`);
  }
}
