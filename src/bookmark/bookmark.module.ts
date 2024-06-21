import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { AuthModule } from 'src/auth/auth.module';
import { IntOrUndefinedPipe } from './pipe';

@Module({
  imports: [AuthModule],
  providers: [BookmarkService, IntOrUndefinedPipe],
  controllers: [BookmarkController],
})
export class BookmarkModule {}
