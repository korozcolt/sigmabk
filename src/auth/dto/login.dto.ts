import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

// login.dto.ts
export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty()
  password: string;
}
