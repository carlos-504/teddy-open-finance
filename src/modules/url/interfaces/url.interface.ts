import { UpdateUrlDTO } from '../dto/update-url.dto';

export interface CreateOrUpdateUrlInt extends UpdateUrlDTO {
  userId: number;
  clicks?: number;
}
