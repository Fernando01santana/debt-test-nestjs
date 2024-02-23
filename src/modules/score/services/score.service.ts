import { ScoreResponseDto } from '../dtos/score.dto';
import { IScoreService } from '../interfaces/score.service.dto';

export class ScoreService implements IScoreService {
  findByCustomer(data: string): Promise<ScoreResponseDto> {
    //validar se o usuario existe
    //buscar todos os debitos desse usuario
    //somar todas as dividas, e dividir pela quantidade de dividas existentes
    //realizar calculo do score
    //retornar objeto com o score e com a data de hoje
  }
}
