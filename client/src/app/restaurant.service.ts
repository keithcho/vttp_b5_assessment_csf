import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CartItem, MenuItem, PayloadItem } from "./models";
import { OrderStore } from "./order.store";

@Injectable()
export class RestaurantService {

  private http = inject(HttpClient)
  private orderStore = inject(OrderStore)

  menuItems!: MenuItem[]
  cartItems!: CartItem[]
  payloadItems!: PayloadItem[]

  // TODO: Task 2.2
  // You change the method's signature but not the name
  getMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>('/api/menu')
  }

  getItemQty(itemId: string): number {
    let qty: number = 0
    this.orderStore.menuItems$.subscribe({
      next: (data) => {
        qty = data.filter(i => i.id === itemId).length
      }
    })
    return qty
    // return this.cartItems.find(item => item.id === itemId)?.quantity
  }

  addItem(cartItem: MenuItem) {
    for (const item of this.cartItems) {
      if (item.id === cartItem.id) {
        item.quantity++
      } else {
        const newItem: CartItem = {
          ...cartItem,
          quantity: 1
        }
        this.cartItems.push(newItem)
      }
    }
  }

  buildCart() {
    this.orderStore.menuItems$.subscribe(item => {
      this.menuItems = item
    })
    var menuSet = new Set<string>()
    this.cartItems = []

    for (let menuItem of this.menuItems) {
      if (!menuSet.has(menuItem.id)) {
        menuSet.add(menuItem.id)
        const cartItem: CartItem = {
          ...menuItem,
          quantity: 1
        }
        this.cartItems.push(cartItem)
      } else {
        for (let cartElem of this.cartItems) {
          if (cartElem.id === menuItem.id) {
            cartElem.quantity++
          }
        }
      } 
    }
  }

  clearCart() {
    this.cartItems = []
    this.orderStore.clearStore()
  }

  // TODO: Task 3.2
  confirmOrder(username: string, password: string) {
    this.payloadItems = []
    for (let item of this.cartItems) {
      const payloadItem: PayloadItem = {
        id: item.id,
        price: item.price,
        quantity: item.quantity
      }
      this.payloadItems.push(payloadItem)
    }
    
    const payload = {
      username: username,
      password: password,
      items: this.payloadItems
    }
    console.log(payload)
    return this.http.post<CartItem[]>('/api/food_order', payload).subscribe({
      next: (response) => {
        console.log('Order sent successfully: ' + response)
      },
      error: (error) => {
        const errorMessage = error.error?.message || JSON.stringify(error.error);
        console.log('Error placing order: ' + errorMessage)
      }
    })
  }
}
