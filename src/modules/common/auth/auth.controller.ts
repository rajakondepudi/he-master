import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('token')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async createToken(@Body() data) {
    if (data.username) {
      return await this.authService.generateToken(data);
    } else {
      return { access_token: '' };
    }
  }
}
