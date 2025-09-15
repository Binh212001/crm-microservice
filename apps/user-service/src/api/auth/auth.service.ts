import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LogoutDto } from './dto/logout.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Transactional } from 'typeorm-transactional';
import { TokenDto } from './dto/token.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    @Inject('EMAIL_SERVICE')
    private readonly emailClientProxy: ClientProxy,
  ) {}

  async login(dto: LoginDto): Promise<TokenDto> {
    const user = await this.validateUser(dto.email, dto.password);
    const accessToken = this.jwtService.sign(user);
    const refreshToken = this.jwtService.sign(user, { expiresIn: '7d' });
    return {
      userId: user.id,
      token: accessToken,
      refreshToken,
    };
  }

  @Transactional()
  async register(dto: RegisterDto): Promise<{ token: string }> {
    const user = this.userRepository.create({
      ...dto,
    });
    await this.userRepository.save(user);
    return { token: 'mock-token' };
  }

  async logout(_dto: LogoutDto): Promise<{ token: string }> {
    return { token: 'mock-token' };
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<{
    data: boolean;
  }> {
    const emailHasSent = await this.cacheManager.get<boolean>(dto.email);
    if (!emailHasSent) {
      const password = Math.random().toString(36).substring(2, 15);
      await this.userRepository.update(dto.email, { password });
      this.emailClientProxy.emit('send_forgot_password', {
        email: dto.email,
        password,
      });
      await this.cacheManager.set<boolean>(dto.email, true, 60000);
    }
    return { data: true };
  }

  async resetPassword(dto: ResetPasswordDto): Promise<{ data: boolean }> {
    await this.userRepository.update(dto.token, { password: dto.newPassword });
    this.emailClientProxy.emit('send_reset_password', {
      email: dto.token,
      password: dto.newPassword,
    });
    return { data: true };
  }

  async verifyEmail(dto: VerifyEmailDto): Promise<{ data: boolean }> {
    await this.userRepository.update(dto.token, { email: dto.token });
    this.emailClientProxy.emit('send_verify_email', {
      email: dto.token,
    });
    return { data: true };
  }

  async changePassword(dto: ChangePasswordDto): Promise<{ data: boolean }> {
    await this.userRepository.update(dto.currentPassword, {
      password: dto.newPassword,
    });
    this.emailClientProxy.emit('send_change_password', {
      email: dto.currentPassword,
      password: dto.newPassword,
    });
    return { data: true };
  }

  async validateUser(email: string, pass: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
