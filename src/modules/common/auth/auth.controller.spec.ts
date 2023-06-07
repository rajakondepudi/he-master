import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'testing',
          signOptions: { expiresIn: '1h' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('generateToken', () => {
    it('should succeed', async () => {
      const result = {
        access_token: 'hoDPPYDYZP2EKtMzhrWIbiIuwS7zxqGzvBLs_ZFpkEI',
      };
      const data = { username: 'Johnson Smith', usertype: 'user' };
      jest.spyOn(authService, 'generateToken').mockImplementation(async () => result);
      const response = await authController.createToken(data);
      expect(typeof response).toEqual('object');
      expect(response).toHaveProperty('access_token');
    });

    it('should return empty access token', async () => {
      const data = {};
      const response = await authController.createToken(data);
      expect(typeof response).toEqual('object');
      expect(response).toHaveProperty('access_token');
      expect(response.access_token).toBe('');
    });
  });
});
