import { ComponentStore } from "@ngrx/component-store";
import { MenuItem } from "./models";
import { Injectable } from "@angular/core";

export interface OrderState {
  items: MenuItem[]
  // orderMap: Map<string, number>
}

const initialState: OrderState = {
  items: [],
  // orderMap: new Map<string, number>()
}

@Injectable()
export class OrderStore extends ComponentStore<OrderState> {
  constructor() { super(initialState) }

  // Selectors
  readonly cartItems$ = this.select(store => store.items)
  // readonly orderMap$ = this.select(store => store.orderMap)
  readonly itemCount$ = this.select(store => store.items.length)

  // Updaters
  readonly addItem = this.updater((store, item: MenuItem) => {
    return {
      items: [ ...store.items, item ],
      // orderMap: store.orderMap.set(item.id, store.orderMap.get(item.id)! + 1)
    } as OrderState
  })

  readonly removeItem = this.updater((store, itemId: string) => {
    return {
      items: store.items.filter(item => item.id !== itemId)
    } as OrderState
  })
}