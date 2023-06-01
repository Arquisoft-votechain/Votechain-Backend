import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationTypes } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options:{
      host: '127.0.0.1',
      port: 4201
    }
  })

  await app.startAllMicroservices()
  await app.listen(4201);
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
