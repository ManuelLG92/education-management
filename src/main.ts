import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MikroORM } from '@mikro-orm/core';
import { NextFunction, Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('edu management')
    .setDescription('edu management description')
    .setVersion('1.0')
    .addTag('EduManagement')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableShutdownHooks();
  app.enableCors();

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Expose-Headers', 'Content-Range');
    next();
  });
  await app.listen(8001);
  Logger.log(`Server listening on port 3000`);

  const init = await app.resolve(MikroORM);
  const generator = init.getSchemaGenerator();
  // await generator.dropSchema();
  await generator.updateSchema();
  //
  // const seeder = init.getSeeder();
  // await seeder.seed(SchoolFixtures);
}
bootstrap().catch((error) => console.log(`Failed to start server: ${error}`));
