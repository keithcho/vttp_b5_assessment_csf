import { Component, inject, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { firstValueFrom, lastValueFrom, map, Observable, take } from 'rxjs';
import { CartItem, MenuItem } from '../models';
import { OrderStore } from '../order.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  menuItems$!: Observable<MenuItem[]>
  itemCount$!: Observable<number>
  totalPrice$!: Observable<number>
  cartItems!: CartItem[]

  // TODO: Task 2
  private router = inject(Router)
  private restaurantSvc = inject(RestaurantService)
  private orderStore = inject(OrderStore)

  ngOnInit(): void {
    // this.cartItems$ = this.restaurantSvc.getMenuItems().pipe(
    //   map(menuItem => menuItem.map(item => new CartItem())

    //   )
    // )
    this.menuItems$ = this.restaurantSvc.getMenuItems()
    this.cartItems = this.restaurantSvc.cartItems
    this.itemCount$ = this.orderStore.itemCount$
    this.totalPrice$ = this.orderStore.totalPrice$
  }

  addItem(item: MenuItem) {
    this.orderStore.addItem(item)
    // this.restaurantSvc.addItem(item)
  }

  removeItem(itemId: string) {
    this.orderStore.removeItem(itemId)
  }

  getItemQty(itemId: string): number {
    return this.restaurantSvc.getItemQty(itemId)
  }

  placeOrder() {
    this.restaurantSvc.buildCart()
    this.router.navigate(['/placeorder'])
  }

}
