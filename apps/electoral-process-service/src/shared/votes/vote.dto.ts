import { BaseResponse } from "src/utils/base.response";

export class VoteDto {
    votes: number
}

export class VoteResponse extends BaseResponse<VoteDto>{}