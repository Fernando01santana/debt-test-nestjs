import { Controller, Param, Post } from '@nestjs/common';
import { ScoreResponseDto } from '../dtos/score.dto';
import { ScoreService } from '../services/score.service';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post(':document')
  async findScoreByCustomer(
    @Param('document') data: string,
  ): Promise<ScoreResponseDto> {
    return await this.scoreService.findByCustomer(data);
  }
}
