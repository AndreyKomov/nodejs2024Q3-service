import { Expose } from 'class-transformer';
import { ResponseArtistDto } from '../../artist/dto/response-artist.dto';
import { ResponseAlbumDto } from '../../album/dto/response-album.dto';
import { ResponseTrackDto } from '../../track/dto/response-track.dto';

export class ResponseFavoriteDto {
  @Expose()
  artists: ResponseArtistDto[];
  @Expose()
  albums: ResponseAlbumDto[];
  @Expose()
  tracks: ResponseTrackDto[];
}
