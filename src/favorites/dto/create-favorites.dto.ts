import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFavoritesDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
