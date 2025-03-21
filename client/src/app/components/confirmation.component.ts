import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: false,
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {

  private router = inject(Router)

  // TODO: Task 5

  back() {
    this.router.navigate(['/'])
  }
}
