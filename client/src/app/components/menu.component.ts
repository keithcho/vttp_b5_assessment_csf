import { Component, inject, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { firstValueFrom, lastValueFrom, Observable, take } from 'rxjs';
import { MenuItem } from '../models';
import { OrderStore } from '../order.store';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  menuItems$!: Observable<MenuItem[]>
  itemCount$!: Observable<number>
  orderMap$!: Observable<Map<string, number>>
  // TODO: Task 2
  private restaurantSvc = inject(RestaurantService)
  private orderStore = inject(OrderStore)

  ngOnInit(): void {
    this.menuItems$ = this.restaurantSvc.getMenuItems()
    this.itemCount$ = this.orderStore.itemCount$
    // this.orderMap$ = this.orderStore.orderMap$
  }

  addItem(item: MenuItem) {
    this.orderStore.addItem(item)
  }

  removeItem(itemId: string) {
    this.orderStore.removeItem(itemId)
  }

  getItemQty(itemId: string): number {
    let qty: number = 0
    this.orderStore.cartItems$.subscribe({
      next: (data) => {
        qty = data.filter(i => i.id === itemId).length
      }
    })
    return qty
  }

  getTotalPrice(): number {
    let totalPrice: number = 0

  }

}
