import { ExcludePasswordInterceptor } from './../intercaptors/exclude-password.untercaptor';
import { NotFoundExceptionFilter } from 'src/filters/not-found-exeption.filter';
import { BadRequestExceptionFilter } from 'src/filters/bad-request-exeption.filter';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ResponseAlbumDto } from './dto/response-album.dto';
import { UUIDValidationPipe } from 'src/filters/validators/uuid.validator';
import { RequestParamValidationPipe } from 'src/filters/validators/request-param.validator';

@UseFilters(BadRequestExceptionFilter, NotFoundExceptionFilter)
@UseInterceptors(new ExcludePasswordInterceptor(ResponseAlbumDto))
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll(): ResponseAlbumDto[] {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', UUIDValidationPipe)
    id: string,
  ): ResponseAlbumDto | undefined {
    return this.albumService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body(RequestParamValidationPipe) createAlbumDto: CreateAlbumDto,
  ): ResponseAlbumDto {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  update(
    @Param('id', UUIDValidationPipe) id: string,
    @Body(RequestParamValidationPipe)
    updateAlbumDto: UpdateAlbumDto,
  ): ResponseAlbumDto | undefined {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', UUIDValidationPipe) id: string): boolean {
    return this.albumService.remove(id);
  }
}
