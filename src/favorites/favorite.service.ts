import { Favorites } from './../interfaces/favorites';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { DatabaseService } from 'src/db/db';
import { TrackService } from 'src/track/track.service';
import { ResponseFavoriteDto } from './dto/response-favorite.dto';
import { Artist } from 'src/interfaces/artist';
import { Track } from 'src/interfaces/track';
import { Album } from 'src/interfaces/album';

export type FavoriteType = 'artists' | 'albums' | 'tracks';

@Injectable()
export class FavoriteService {
  constructor(
    private db: DatabaseService<Favorites>,
    private trackService: TrackService,
    private albumService: AlbumService,
    private artistService: ArtistService,
  ) {}

  create(id: string, type: FavoriteType): ResponseFavoriteDto {
    let entity: Artist | Track | Album;

    if (type === 'tracks') {
      entity = this.trackService.findOne(id);
    }

    if (type === 'albums') {
      entity = this.albumService.findOne(id);
    }

    if (type === 'artists') {
      entity = this.artistService.findOne(id);
    }

    if (!entity) {
      throw new UnprocessableEntityException(
        `${type.toUpperCase()} with ID: "${id}" is not found.`,
      );
    }

    return this.db.createFavorite(id, type) as unknown as ResponseFavoriteDto;
  }

  findAll(): ResponseFavoriteDto {
    const tracks = this.trackService.findAll();
    const albums = this.albumService.findAll();
    const artists = this.artistService.findAll();
    const favorites = this.db.getAllFavorite();

    return {
      artists: artists.filter((artist) =>
        favorites.artists.some((favArtistId) => favArtistId === artist.id),
      ),
      albums: albums.filter((album) =>
        favorites.albums.some((favAlbumId) => favAlbumId === album.id),
      ),
      tracks: tracks.filter((track) =>
        favorites.tracks.some((favTrackId) => favTrackId === track.id),
      ),
    };
  }

  remove(id: string, type: FavoriteType): void {
    const isFavoriteIdExist = this.db.getAllFavorite()[type].includes(id);

    if (!isFavoriteIdExist) {
      throw new NotFoundException(
        `Favorite "${type}" with ID: "${id}" is not found.`,
      );
    }

    this.db.removeFavorite(id, type);
  }
}
