import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

describe('HealthService', () => {
  let authService: AuthService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'testing',
          signOptions: { expiresIn: '1h' },
        }),
      ],
      providers: [AuthService],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('generateToken', () => {
    it('get success to generate token', async () => {
      const data = { username: 'Johnson Smith', usertype: 'user' };
      const response = await authService.generateToken(data);
      expect(typeof response).toEqual('object');
      expect(response).toHaveProperty('access_token');
    });
  });
});
