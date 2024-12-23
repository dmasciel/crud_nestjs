import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //remove chaves que não estão no dto
      forbidNonWhitelisted: true, // Levantar erro quando a chave não existir
      transform: false, //tenta transformar os tipo de dados de param e dtos (melhor usar o ParseIntPipe)
    }),
    //new ParseIntIdPipe(),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
