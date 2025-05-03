import { Controller, Body, Post, Get, Inject, Query } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { IUserController, IUser } from '@repo/type';
import { UserService } from 'src/application/services/impl/UserService';
import { Public } from 'src/decorator/PublicDecorator';
import { IUserContext, IUserContextToken } from 'src/application/contexts/user/IUserContext';
import { LoginDto } from '../dto/UserDto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController implements IUserController {
  constructor(
    private service: UserService,
    @Inject(IUserContextToken) private userContext: IUserContext,
  ) {}

  @Post('send-otp')
  @Public()
  @ApiOperation({ summary: 'Send OTP to user email' })
  @ApiResponse({ status: 200, description: 'OTP sent successfully' })
  async sendOTP(@Body() data: { username: string }): Promise<void> {
    return this.service.sendOTP(data);
  }

  @Post('login')
  @Public()
  @ApiOperation({ summary: 'User login' })
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.service.login(loginDto);
  }

  @Post('logout')
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: 200, description: 'Successfully logged out' })
  logout(): Promise<void> {
    return this.service.logout();
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user information' })
  async me(): Promise<IUser> {
    const user = await this.userContext.getCurrentUser();
    return this.service.get(user.id);
  }
}
