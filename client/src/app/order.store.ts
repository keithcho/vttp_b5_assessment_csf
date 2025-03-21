import { ComponentStore } from "@ngrx/component-store";
import { CartItem, MenuItem } from "./models";
import { Injectable } from "@angular/core";

export interface OrderState {
  menuItems: MenuItem[]
  cartItems: CartItem[]
}

const initialState: OrderState = {
  menuItems: [],
  cartItems: []
}

@Injectable()
export class OrderStore extends ComponentStore<OrderState> {
  constructor() { super(initialState) }

  // Selectors
  readonly menuItems$ = this.select(store => store.menuItems)
  readonly cartItems$ = this.select(store => store.cartItems)
  readonly itemCount$ = this.select(store => store.menuItems.length)
  readonly totalPrice$ = this.select(store => {
    let totalPrice: number = 0
    store.menuItems.forEach(menuItems => totalPrice += menuItems.price)
    return totalPrice
  })

  // Updaters
  readonly addItem = this.updater((store, item: MenuItem) => {
    // const cartItem: CartItem = {
    //   id: item.id,
    //   name: item.name,
    //   description: item.description,
    //   price: item.price,
    //   quantity: item.quantity + 1,
    // }
    return {
      menuItems: [ ...store.menuItems, item ],
    } as OrderState
  })

  readonly removeItem = this.updater((store, itemId: string) => {
    return {
      menuItems: store.menuItems.filter(item => item.id !== itemId)
    } as OrderState
  })

  readonly clearStore = this.updater(() => initialState)
}