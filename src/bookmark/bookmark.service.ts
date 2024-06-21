import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  async getBookmarks(userId: number) {
    return await this.prisma.bookmark.findMany({
      where: {
        user_id: userId,
      },
    });
  }

  async getBookmark(userId: number, bookmarkId: number) {
    return await this.prisma.bookmark.findMany({
      where: {
        user_id: userId,
        id: bookmarkId,
      },
    });
  }

  async createBookmark(
    bookmarkDto: CreateBookmarkDto,
    userId: number,
  ) {
    try {
      const bookmark = await this.prisma.bookmark.create({
        data: {
          title: bookmarkDto.title,
          description: bookmarkDto.description,
          url: bookmarkDto.url,
          user_id: userId,
        },
      });

      return bookmark;
    } catch (error) {
      throw error;
    }
  }

  updateBookmark(
    userId: number,
    bookmarkId: number,
    editBookmarkDto: EditBookmarkDto,
  ) {
    const bookmark = this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        user_id: userId,
      },
    });

    if (!bookmark) {
      throw new ForbiddenException("Can't access this resource!");
    }

    return this.prisma.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: {
        title: editBookmarkDto.title,
        description: editBookmarkDto.description,
        url: editBookmarkDto.url,
      },
    });
  }

  deleteBookmark(userId: number, bookmarkId: number) {
    const bookmark = this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        user_id: userId,
      },
    });

    if (!bookmark) {
      throw new ForbiddenException("Can't access this resource!");
    }

    return this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
  }
}
