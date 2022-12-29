import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup() {
    return this.authService.signup();
  }

  @Post('signin')
  async signin() {
    return this.authService.signin();
  }

  @Post('logout')
  async logout() {
    return this.authService.logout();
  }

  @Post('refresh')
  async refresh() {
    return this.authService.refresh();
  }
}
