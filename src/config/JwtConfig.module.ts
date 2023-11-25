import { Global, Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey', // replace with your secret key
      signOptions: { expiresIn: process.env.JWT_EXPIRE || '30m' }, // replace with your desired token expiry
    }),
  ],
  exports: [JwtModule],
})
export class JwtConfigModule {}
