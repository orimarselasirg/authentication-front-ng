import { Component, computed, inject } from '@angular/core';
import { AuthServicesService } from '../../../auth/services/auth-services.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

  private authService = inject(AuthServicesService)

  public user = computed(() => this.authService.currentUser())

  // get user(){
  //   return this.authService.currentUser()
  // }

  logout(){
    this.authService.logout()
  }

}
