import {
  ForbiddenException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientInitializationError } from '@prisma/client/runtime/library';

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

  async getBookmarksWithPagination(
    userId: number,
    pageNumber: number,
    pageSize: number,
  ) {
    try {
      const totalBookmarks = await this.prisma.bookmark.count({
        where: {
          user_id: userId,
        },
      });

      const totalPages = Math.ceil(totalBookmarks / pageSize);

      if (pageNumber > totalPages) {
        return {
          data: [],
          pageNumber,
          totalPages,
        };
      }

      const skip = (pageNumber - 1) * pageSize;

      const requestedBookmars = await this.prisma.bookmark.findMany({
        where: {
          user_id: userId,
        },
        skip: skip,
        take: pageSize,
      });

      return {
        data: requestedBookmars,
        pageNumber,
        totalPages,
      };
    } catch (error) {
      if (error instanceof PrismaClientInitializationError) {
        throw new ServiceUnavailableException(
          'Service is unavailable!',
        );
      }
    }
  }

  async getBookmark(userId: number, bookmarkId: number) {
    try {
      return await this.prisma.bookmark.findMany({
        where: {
          user_id: userId,
          id: bookmarkId,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientInitializationError) {
        throw new ServiceUnavailableException(
          'Service is unavailable!',
        );
      }
      throw error;
    }
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
      if (error instanceof PrismaClientInitializationError) {
        throw new ServiceUnavailableException(
          'Service is unavailable!',
        );
      }
      throw error;
    }
  }

  updateBookmark(
    userId: number,
    bookmarkId: number,
    editBookmarkDto: EditBookmarkDto,
  ) {
    try {
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
    } catch (error) {
      if (error instanceof PrismaClientInitializationError) {
        throw new ServiceUnavailableException(
          'Service is unavailable!',
        );
      }
      throw error;
    }
  }

  deleteBookmark(userId: number, bookmarkId: number) {
    try {
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
    } catch (error) {
      if (error instanceof PrismaClientInitializationError) {
        throw new ServiceUnavailableException(
          'Service is unavailable!',
        );
      }
      throw error;
    }
  }
}
