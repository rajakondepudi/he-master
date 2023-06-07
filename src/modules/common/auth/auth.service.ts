import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(data: any) {
    const payload = data;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
