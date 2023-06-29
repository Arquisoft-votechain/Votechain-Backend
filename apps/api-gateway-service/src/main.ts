import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import {readFileSync} from 'fs';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    httpsOptions: {
      key: readFileSync("./src/certs/www_votechain_online.key"),
      cert: readFileSync("./src/certs/www_votechain_online.crt"),
      ca: readFileSync("./src/certs/www_votechain_online.ca-bundle"),
    } as HttpsOptions,
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(+process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap();
