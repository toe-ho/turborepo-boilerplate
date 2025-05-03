import { ApiProperty } from "@nestjs/swagger";
import { ILoginDto } from '@repo/type';

export class LoginDto implements ILoginDto {
    @ApiProperty({ example: 'admin', description: 'Username of the user' })
    username: string;

    @ApiProperty({ example: '123123', description: 'OTP' })
    otp: string;
}