import { ScoreResponseDto } from '../dtos/score.dto';

export interface IScoreService {
  findByCustomer(data: string): Promise<ScoreResponseDto>;
}
