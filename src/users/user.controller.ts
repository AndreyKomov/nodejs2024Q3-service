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
import { BadRequestExceptionFilter } from 'src/filters/bad-request-exeption.filter';
import { NotFoundExceptionFilter } from 'src/filters/not-found-exeption.filter';
import { ExcludePasswordInterceptor } from 'src/intercaptors/exclude-password.untercaptor';
import { ResponseUserDto } from './dto/response-user.dto';
import { UserService } from './user.service';
import { UUIDValidationPipe } from 'src/filters/validators/uuid.validator';
import { RequestParamValidationPipe } from 'src/filters/validators/request-param.validator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@UseFilters(BadRequestExceptionFilter, NotFoundExceptionFilter)
@UseInterceptors(new ExcludePasswordInterceptor(ResponseUserDto))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): ResponseUserDto[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', UUIDValidationPipe)
    id: string,
  ): ResponseUserDto | undefined {
    return this.userService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body(RequestParamValidationPipe) createUserDto: CreateUserDto,
  ): ResponseUserDto {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id', UUIDValidationPipe) id: string,
    @Body(RequestParamValidationPipe)
    updateUserPasswordDto: UpdatePasswordDto,
  ): ResponseUserDto | undefined {
    return this.userService.update(id, updateUserPasswordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', UUIDValidationPipe) id: string): boolean {
    return this.userService.remove(id);
  }
}
