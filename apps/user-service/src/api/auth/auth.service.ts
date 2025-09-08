import { Injectable, UnauthorizedException } from '@nestjs/common';
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

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
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

  async forgotPassword(_dto: ForgotPasswordDto): Promise<{ token: string }> {
    return { token: 'mock-token' };
  }

  async resetPassword(_dto: ResetPasswordDto): Promise<{ token: string }> {
    return { token: 'mock-token' };
  }

  async verifyEmail(_dto: VerifyEmailDto): Promise<{ token: string }> {
    return { token: 'mock-token' };
  }

  async changePassword(_dto: ChangePasswordDto): Promise<{ token: string }> {
    return { token: 'mock-token' };
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
