import {
  ForbiddenException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { user } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);

    try {
      // save the new user in the db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          pwdHash: hash,
        },
      });
      delete user.pwdHash;
      // return the saved user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }

      if (error instanceof PrismaClientInitializationError) {
        throw new ServiceUnavailableException(
          'Service is unavailable!',
        );
      }
      throw error;
    }
  }

  async signin(dto: AuthDto): Promise<{ access_token: string }> {
    let user: user;

    try {
      user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientInitializationError) {
        throw new ServiceUnavailableException(
          'Service is unavailable!',
        );
      }
    }

    if (!user) throw new ForbiddenException('User does not exist!');

    // verify that the submitted pwd matches
    const pwdMatch = await argon.verify(user.pwdHash, dto.password);

    if (!pwdMatch) throw new ForbiddenException('Wrong password!');

    const payload = {
      sub: user.id,
      email: user.email,
    };

    try {
      return {
        access_token: await this.jwt.signAsync(payload, {
          expiresIn: '10m',
          secret: this.config.get('JWT_SECRET'),
        }),
      };
    } catch (error) {
      if (error instanceof PrismaClientInitializationError) {
        throw new ServiceUnavailableException(
          'Service is unavailable!',
        );
      }
    }
  }
}
