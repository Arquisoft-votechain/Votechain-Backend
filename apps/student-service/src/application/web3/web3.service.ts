
import Web3 from "web3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class Web3Service{
    private web3Instance: Web3;

    constructor(private configService: ConfigService){
        this.web3Instance = new Web3(
            new Web3.providers.HttpProvider(
                this.configService.get<string>('WEB3_ENDPOINT'),
            )
        )
    }

    async getBlockNumber(){
        return await this.web3Instance.eth.getBlockNumber();
    }
    
}