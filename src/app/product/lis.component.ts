import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lis',
  templateUrl: './lis.component.html',
  styleUrls: ['./lis.component.css']
})
export class LisComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private ProductService: ProductService,
    private toast: ToastrService
  ){}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.ProductService.list().subscribe(
      data => {

        this.products = data;
        
      },
      err => {
        this.toast.error(err.error.message, "Error", {timeOut: 3000, positionClass: "toast-top-center"});
        
      }
    );
  }

  onDelete(id: number): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You cannot undo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if(result.value){
        this.ProductService.delete(id).subscribe(
          data => {

            this.toast.success(data.message, "OK", {timeOut: 3000, positionClass: "toast-top-center"});
            this.getProducts();
          },  
          err => {
            this.toast.error(err.error.message, "Error", {timeOut: 3000, positionClass: "toast-top-center"});
            
          }
        );
      }else if(result.dismiss === Swal.DismissReason.cancel){
        Swal.fire(
          "Canceled",
          "product not deleted",
          "error"
        )
      }
    })
  }

}
