import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LogoutDto } from './dto/logout.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { TokenDto } from './dto/token.dto';
import { Public } from 'apps/libs/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<TokenDto> {
    return await this.authService.login(loginDto);
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<{ token: string }> {
    return await this.authService.register(registerDto);
  }

  @Public()
  @Post('logout')
  async logout(@Body() logoutDto: LogoutDto): Promise<{ token: string }> {
    return await this.authService.logout(logoutDto);
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<{ token: string }> {
    return await this.authService.forgotPassword(forgotPasswordDto);
  }

  @Public()
  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<{ token: string }> {
    return await this.authService.resetPassword(resetPasswordDto);
  }

  @Public()
  @Post('verify-email')
  async verifyEmail(
    @Body() verifyEmailDto: VerifyEmailDto,
  ): Promise<{ token: string }> {
    return await this.authService.verifyEmail(verifyEmailDto);
  }
  @Public()
  @Post('change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<{ token: string }> {
    return await this.authService.changePassword(changePasswordDto);
  }
}
