import { Component, computed, effect, inject } from '@angular/core';
import { AuthServicesService } from './auth/services/auth-services.service';
import { AuthStatus } from './auth/interfaces/auth-status.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // title = 'authApp';
  private authService = inject(AuthServicesService);
  private route = inject(Router);

  public finishedAuthCheck = computed<boolean>(() =>{
    if(this.authService.authStatus() === AuthStatus.checking) return false;

    return true
  })

  public authStatusEffect = effect(() => {

    switch(this.authService.authStatus()){
      case AuthStatus.checking:
        return
      case AuthStatus.authenticated:
        this.route.navigateByUrl('/dashboard')
        return
      case AuthStatus.notAuthenticated:
        this.route.navigateByUrl('/auth/login')
        return

    }

    console.log('first', this.authService.authStatus())
      this.finishedAuthCheck()
  })
}
