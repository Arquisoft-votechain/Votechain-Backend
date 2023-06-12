import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  config();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options:{
        host: 'localhost',
        port: 4200
      }
    },
  );

  await app.listen()
}
bootstrap();
