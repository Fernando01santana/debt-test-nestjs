import { Controller, Param, Post } from '@nestjs/common';
import { ScoreResponseDto } from '../dtos/score.dto';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: scoreService) {}

  @Post(':document')
  async findScoreByCustomer(
    @Param('document') data: string,
  ): Promise<ScoreResponseDto> {
    return await this.scoreService.findScoreByCustomer(data);
  }
}
