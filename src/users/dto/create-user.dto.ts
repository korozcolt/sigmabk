import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches('^(\\+57)?[1-9]{1}[0-9]{9}$', '', {
    message: 'Invalid phone number. It must be a valid Colombian phone number.',
  })
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    { message: 'password too weak' },
  )
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  isActive: boolean;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  updatedAd?: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  lastLogin?: Date;

  @IsNotEmpty()
  @ApiProperty()
  role: string; // Assuming role is represented by its name
}
