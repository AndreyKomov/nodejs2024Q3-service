import { ExcludePasswordInterceptor } from './../intercaptors/exclude-password.untercaptor';
import { NotFoundExceptionFilter } from './../filters/not-found-exeption.filter';
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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ResponseTrackDto } from './dto/response-track.dto';
import { UUIDValidationPipe } from 'src/filters/validators/uuid.validator';
import { RequestParamValidationPipe } from 'src/filters/validators/request-param.validator';

@UseFilters(BadRequestExceptionFilter, NotFoundExceptionFilter)
@UseInterceptors(new ExcludePasswordInterceptor(ResponseTrackDto))
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  findAll(): ResponseTrackDto[] {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', UUIDValidationPipe)
    id: string,
  ): ResponseTrackDto | undefined {
    return this.trackService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body(RequestParamValidationPipe) createTrackDto: CreateTrackDto,
  ): ResponseTrackDto {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  update(
    @Param('id', UUIDValidationPipe) id: string,
    @Body(RequestParamValidationPipe)
    updateTrackDto: UpdateTrackDto,
  ): ResponseTrackDto | undefined {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', UUIDValidationPipe) id: string): boolean {
    return this.trackService.remove(id);
  }
}
