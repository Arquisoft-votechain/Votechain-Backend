import { CreateVoteDto, UpdateVoteDto } from "src/application/index.application";
import { Vote } from "../models/vote.entity";
import { VoteResponse } from "src/application/vote/dto/vote.response";

export interface VoteService{
    registerVote(studentId: number, politicalPartyId: number);
    findOneVote(id: number);
    update(id: number, updateVoteDto: UpdateVoteDto);
    remove(id: number): Promise<void>;
}