import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../services/product.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  product: Product | undefined;
   
  constructor(
    private productService: ProductService,
    private toast: ToastrService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }
  getProduct() :void{
    const id = this.activateRoute.snapshot.params['id'];
    this.productService.detail(id).subscribe(
      data => {
        this.product = data;
        console.log('Produto: ',this.product);
      },
      err=>{
        this.toast.error(err.error.message, "Error", {timeOut: 3000, positionClass: "toast-top-center"});
        this.router.navigate(['']);
      }
    )
  }


}
