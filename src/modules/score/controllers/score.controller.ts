import { Controller, Get, Param } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ScoreResponseDto } from '../dtos/score.dto';
import { ScoreService } from '../services/score.service';

@Controller('score')
@ApiTags('Score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get(':document')
  @ApiOperation({
    description: 'Busca o score do cliente baseado no document enviado.',
  })
  @ApiBody({ type: 'stirng' })
  async findScoreByCustomer(
    @Param('document') data: string,
  ): Promise<ScoreResponseDto> {
    return await this.scoreService.findByCustomer(data);
  }
}
