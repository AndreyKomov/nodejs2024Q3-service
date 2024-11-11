import { Favorites } from './../interfaces/favorites';
import { Injectable } from '@nestjs/common';
import { FavoriteType } from 'src/favorites/favorite.service';
import { v4 } from 'uuid';

@Injectable()
export class DatabaseService<T> {
  private items: T[] = [];
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  create(item: T): T {
    item['id'] = v4();
    this.items.push(item);

    return item;
  }

  findAll(): T[] {
    return this.items;
  }

  findOne(id: string): T | undefined {
    return this.items.find((item) => item['id'] === id);
  }

  update(id: string, updatedItem: T): T | undefined {
    const index = this.items.findIndex((item) => item['id'] === id);

    if (index === -1) {
      return undefined;
    }

    this.items[index] = { ...this.items[index], ...updatedItem };

    return this.items[index];
  }

  remove(id: string): boolean {
    const index = this.items.findIndex((item) => item['id'] === id);

    if (index === -1) {
      return false;
    }

    this.items.splice(index, 1);

    return true;
  }

  createFavorite(favoriteId: string, favoriteType: FavoriteType): Favorites {
    this.favorites[favoriteType].push(favoriteId);
    return this.favorites;
  }

  getAllFavorite(): Favorites {
    return this.favorites;
  }

  removeFavorite(favoriteId: string, favoriteType: FavoriteType): boolean {
    this.favorites[favoriteType] = this.favorites[favoriteType].filter(
      (item) => item !== favoriteId,
    );

    return true;
  }
}
