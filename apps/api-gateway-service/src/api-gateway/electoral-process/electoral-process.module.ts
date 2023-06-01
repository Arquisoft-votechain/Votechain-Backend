import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ElectoralProcessController } from './electoral-process.controller';


@Module({
    imports: [],
    controllers: [ElectoralProcessController],
})
export class ElectoralProcessModule { }
