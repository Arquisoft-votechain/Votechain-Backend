import { Module } from '@nestjs/common';
import { AuthenticateModule } from './authenticate/authenticate.module';
import { PoliticalPartyModule } from './political-party/political-party.module';
import { ElectoralProcessModule } from './electoral-process/electoral-process.module';

@Module({
  imports: [AuthenticateModule, PoliticalPartyModule, ElectoralProcessModule],
})
export class ApiGatewayModule { }
