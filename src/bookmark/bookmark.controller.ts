import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { IntOrUndefinedPipe } from './pipe';

@UseGuards(AuthGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get()
  getBookmarks(
    @Request() req,
    @Query('page', IntOrUndefinedPipe)
    pageNumber?: number | undefined,
    @Query('size', IntOrUndefinedPipe) pageSize?: number | undefined,
  ) {
    const userId = req.user.id;

    if (pageNumber !== undefined && pageSize !== undefined)
      return this.bookmarkService.getBookmarksWithPagination(
        userId,
        pageNumber,
        pageSize,
      );
    else return this.bookmarkService.getBookmarks(userId);
  }

  @Get(':id')
  getBookmark(@Request() req, @Param('id', ParseIntPipe) bookmarkId) {
    const userId = req.user.id;
    return this.bookmarkService.getBookmark(userId, bookmarkId);
  }

  @Post('create')
  createBookmark(
    @Request() req,
    @Body() bookmarkDto: CreateBookmarkDto,
  ) {
    const userId = req.user.id;
    return this.bookmarkService.createBookmark(bookmarkDto, userId);
  }

  @Patch(':id')
  updateBookmark(
    @Request() req,
    @Param('id', ParseIntPipe) bookmarkId,
    @Body() editBookmarkDto: EditBookmarkDto,
  ) {
    const userId = req.user.id;

    return this.bookmarkService.updateBookmark(
      userId,
      bookmarkId,
      editBookmarkDto,
    );
  }

  @Delete(':id')
  deleteBookmark(
    @Request() req,
    @Param('id', ParseIntPipe) bookmarkId,
  ) {
    const userId = req.user.id;

    return this.bookmarkService.deleteBookmark(userId, bookmarkId);
  }
}
