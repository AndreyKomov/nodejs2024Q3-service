import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { DatabaseService } from 'src/db/db';
import { Album } from './../interfaces/album';
import { ResponseAlbumDto } from './dto/response-album.dto';
import { TrackService } from '../track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    private db: DatabaseService<Album>,
    private trackService: TrackService,
  ) {}

  create(createArtistDto: CreateAlbumDto): ResponseAlbumDto {
    const album: Album = {
      ...createArtistDto,
    };
    return this.db.create(album);
  }

  findAll(): ResponseAlbumDto[] {
    return this.db.findAll();
  }

  findOne(id: string): ResponseAlbumDto {
    const album = this.db.findOne(id);

    if (!album) {
      throw new NotFoundException(`Album with ID: "${id}" is not found.`);
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): ResponseAlbumDto {
    const artist = this.db.findOne(id);

    if (!artist) {
      throw new NotFoundException(`Album with ID: "${id}" is not found.`);
    }

    const updatedAlbum: Album = this.db.update(id, {
      ...artist,
      name: updateAlbumDto.name,
      year: updateAlbumDto.year,
      artistId: updateAlbumDto.artistId,
    });

    return updatedAlbum;
  }

  remove(id: string): boolean {
    const isAlbumDeleted = this.db.remove(id);
    if (!isAlbumDeleted) {
      throw new NotFoundException(`Album with ID: "${id}" is not found.`);
    }

    const tracks = this.trackService
      .findAll()
      .filter((track) => track.albumId === id);

    tracks.forEach((track) => {
      this.trackService.update(track.id, { ...track, albumId: null });
    });

    return isAlbumDeleted;
  }
}
