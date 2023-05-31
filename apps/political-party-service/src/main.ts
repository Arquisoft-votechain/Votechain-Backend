import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationTypes } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options:{
        host: '0.0.0.0',
        port: 8080
      }
    }
    );

  //app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

   // Configurar Swagger
  /*const config = new DocumentBuilder()
   .setTitle('Votechain API Documentation')
   .setDescription('Votechain API description')
   .setVersion('1.0')
   .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);*/

  //await app.listen(3000);
  await app.listen();
}
bootstrap();
