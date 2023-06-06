import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { useContainer } from '@nestjs/class-validator';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options:{
      host: process.env.HOSTNAME,
      port: +process.env.PORT
    }
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Aplicar la transformación automática a los DTOs
      whitelist: true, // Filtrar propiedades no decoradas
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });


  await app.startAllMicroservices()
  await app.listen(+process.env.PORT);
  console.log(`App is running on port ${await app.getUrl()}`)
}
bootstrap();
