import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationTypes, useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options:{
      host: process.env.HOSTNAME,
      port: +process.env.PORT
    }
  })

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

  

  //app.setGlobalPrefix('api');
  

   // Configurar Swagger
  /*const config = new DocumentBuilder()
   .setTitle('Votechain API Documentation')
   .setDescription('Votechain API description')
   .setVersion('1.0')
   .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);*/

  //await app.listen(3000);
}
bootstrap();
