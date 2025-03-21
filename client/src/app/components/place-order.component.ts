import { Component, inject, OnInit } from '@angular/core';
import { CartItem, MenuItem } from '../models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RestaurantService } from '../restaurant.service';
import { OrderStore } from '../order.store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-place-order',
  standalone: false,
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css'
})
export class PlaceOrderComponent implements OnInit {

  cartItems!: CartItem[]
  totalPrice$!: Observable<number>
  orderSet$!: Observable<Set<string>>
  form!: FormGroup

  private router = inject(Router)
  private fb = inject(FormBuilder)
  private restaurantSvc = inject(RestaurantService)
  private orderStore = inject(OrderStore)

  ngOnInit(): void {
    this.form = this.createForm()
    this.cartItems = this.restaurantSvc.cartItems
    this.totalPrice$ = this.orderStore.totalPrice$
  }

  // TODO: Task 3
  getItemQty(itemId: string): number | undefined {
    return this.restaurantSvc.getItemQty(itemId)
  }

  startOver() {
    this.restaurantSvc.clearCart()
    this.router.navigate([''])
  }

  confirmOrder() {
    console.log('Order sent')
    this.restaurantSvc.confirmOrder(this.form.value['username'], this.form.value['password'])
    this.router.navigate(['/confirmation'])
  }

  private createForm(): FormGroup {
    return this.fb.group({
      username: this.fb.control<string>('', [ Validators.required ]),
      password: this.fb.control<string>('', [ Validators.required ])
    })
  }

}
