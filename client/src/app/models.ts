// You may use this file to create any models
export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
}

export interface CartItem {
  id: string
  name: string
  description: string
  price: number
  quantity: number
}

export interface PayloadItem {
  id: string
  price: number
  quantity: number
}