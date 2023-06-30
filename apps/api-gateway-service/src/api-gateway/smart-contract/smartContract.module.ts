import { Module } from '@nestjs/common';
import { SmartContractController } from './smartContract.controller';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [
    SmartContractController
  ]
})
export class SmartContractModule { }
