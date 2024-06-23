import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getPort(): number {
    return this.configService.get<number>('PORT', 3000);
  }

  getHost(): string {
    return this.configService.get<string>('HOST', 'localhost');
  }
}
