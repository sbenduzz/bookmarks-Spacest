import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const port = app.get(AppService).getPort();
  const host = app.get(AppService).getHost();
  await app.listen(port, host, () => {
    console.log(`App is running on ${host}:${port}`);
  });
}
bootstrap();
