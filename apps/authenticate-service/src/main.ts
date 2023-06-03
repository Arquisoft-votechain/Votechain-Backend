import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
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

  await app.startAllMicroservices()
  await app.listen(+process.env.PORT);
  console.log(`App is running on port ${await app.getUrl()}`)
  // Configurar Swagger
  /*const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);*/
}
bootstrap();
