import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ResponseArtistDto } from './dto/response-artist.dto';
import { BadRequestExceptionFilter } from 'src/filters/bad-request-exeption.filter';
import { NotFoundExceptionFilter } from 'src/filters/not-found-exeption.filter';
import { ExcludePasswordInterceptor } from 'src/intercaptors/exclude-password.untercaptor';
import { UUIDValidationPipe } from 'src/filters/validators/uuid.validator';
import { RequestParamValidationPipe } from 'src/filters/validators/request-param.validator';

@UseFilters(BadRequestExceptionFilter, NotFoundExceptionFilter)
@UseInterceptors(new ExcludePasswordInterceptor(ResponseArtistDto))
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  findAll(): ResponseArtistDto[] {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', UUIDValidationPipe)
    id: string,
  ): ResponseArtistDto | undefined {
    const artist = this.artistService.findOne(id);

    if (!artist) {
      throw new NotFoundException(`Artist with ID: "${id}" is not found.`);
    }

    return artist;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body(RequestParamValidationPipe) createArtistDto: CreateArtistDto,
  ): ResponseArtistDto {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  update(
    @Param('id', UUIDValidationPipe) id: string,
    @Body(RequestParamValidationPipe)
    updateArtistDto: UpdateArtistDto,
  ): ResponseArtistDto | undefined {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', UUIDValidationPipe) id: string): boolean {
    return this.artistService.remove(id);
  }
}
