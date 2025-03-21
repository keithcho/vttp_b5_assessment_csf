import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MenuItem } from "./models";

@Injectable()
export class RestaurantService {

  private http = inject(HttpClient)

  // TODO: Task 2.2
  // You change the method's signature but not the name
  getMenuItems(): Observable<MenuItem[]> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })
  //   this.http.get<string[]>('/api/menu', { headers }).subscribe({
  //     next: (response) => { return response },
  //     error: (error) => {
  //       console.log('Error retrieving menu items:', error)
  //     }
  //   })
  // }
    return this.http.get<MenuItem[]>('/api/menu')
  }

  // TODO: Task 3.2
}
