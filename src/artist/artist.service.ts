import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { DatabaseService } from 'src/db/db';
import { Artist } from 'src/interfaces/artist';
import { TrackService } from 'src/track/track.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ResponseArtistDto } from './dto/response-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    private db: DatabaseService<Artist>,
    private trackService: TrackService,
    private albumService: AlbumService,
  ) {}

  create(createArtistDto: CreateArtistDto): ResponseArtistDto {
    const artist: Artist = {
      ...createArtistDto,
    };
    return this.db.create(artist);
  }

  findAll(): ResponseArtistDto[] {
    return this.db.findAll();
  }

  findOne(id: string): ResponseArtistDto {
    const artist = this.db.findOne(id);

    return artist;
  }

  update(id: string, updateArtistdDto: UpdateArtistDto): ResponseArtistDto {
    const artist = this.db.findOne(id);

    if (!artist) {
      throw new NotFoundException(`Artist with ID: "${id}" not found.`);
    }

    const updatedArtist: Artist = this.db.update(id, {
      ...artist,
      name: updateArtistdDto.name,
      grammy: updateArtistdDto.grammy,
    });

    return updatedArtist;
  }

  remove(id: string): boolean {
    const isArtistDeleted = this.db.remove(id);
    if (!isArtistDeleted) {
      throw new NotFoundException(`Artist with ID: "${id}" is not found.`);
    }

    const tracks = this.trackService
      .findAll()
      .filter((track) => track.artistId === id);

    const albums = this.albumService
      .findAll()
      .filter((album) => album.artistId === id);

    tracks.forEach((track) => {
      this.trackService.update(track.id, { ...track, artistId: null });
    });

    albums.forEach((album) => {
      this.albumService.update(album.id, { ...album, artistId: null });
    });

    return isArtistDeleted;
  }
}
