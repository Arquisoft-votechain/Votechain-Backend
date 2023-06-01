import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // 
import { EmailController } from './email/email.controller';
import { EmailService } from './email/email.service';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  controllers: [EmailController],
  providers: [EmailService],
})
export class AppModule {}
