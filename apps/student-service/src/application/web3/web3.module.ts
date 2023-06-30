import { Global, Module } from "@nestjs/common";
import { Web3ServiceImpl } from "./web3Impl.service";

@Global()
@Module({
    providers: [Web3ServiceImpl],
    exports: [Web3ServiceImpl]
})

export class Web3Module {}