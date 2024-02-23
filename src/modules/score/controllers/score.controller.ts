import { Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ScoreResponseDto } from '../dtos/score.dto';
import { ScoreService } from '../services/score.service';

@Controller('score')
@ApiTags('Score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post(':document')
  async findScoreByCustomer(
    @Param('document') data: string,
  ): Promise<ScoreResponseDto> {
    return await this.scoreService.findByCustomer(data);
  }
}
