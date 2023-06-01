import { Module } from '@nestjs/common';
import { ApiGatewayModule } from './api-gateway/api-gateway.module';
import { PoliticalPartyModule } from './api-gateway/political-party/political-party.module';



@Module({
  imports: [
    ApiGatewayModule,
    PoliticalPartyModule 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
