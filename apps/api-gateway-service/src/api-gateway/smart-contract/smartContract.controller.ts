import { Controller, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import axios from 'axios';


@ApiTags('SmartContracts')
@Controller('SmartContract')
export class SmartContractController {
    private base_url: string;
    constructor(private configService: ConfigService) {
        this.base_url = this.configService.get<string>('SMARTCONTRACT_HOSTNAME')
    }

    @Post('/deploy')
    async DeployAnSmartContract() {
        const response = await axios.post(`http://${this.base_url}:3000/deploy`);
        return response.data;
    }

   
}
