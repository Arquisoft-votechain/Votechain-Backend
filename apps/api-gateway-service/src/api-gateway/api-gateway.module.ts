import { Module } from '@nestjs/common';
import { AuthenticateModule } from './authenticate/authenticate.module';
import { PoliticalPartyModule } from './political-party/political-party.module';
import { ElectoralProcessModule } from './electoral-process/electoral-process.module';
import { StudentModule } from './student/student.module';
import { AdministratorModule } from './administrator/administrator.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { SmartContractModule } from './smart-contract/smartContract.module';

@Module({
  imports: [AuthenticateModule, PoliticalPartyModule, ElectoralProcessModule, StudentModule, AdministratorModule, UserModule, SmartContractModule],
})
export class ApiGatewayModule { }
