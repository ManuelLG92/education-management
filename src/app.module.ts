import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolModule } from './school/school.module';
import { PersonModule } from './person/person.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ReflectMetadataProvider } from '@mikro-orm/core';
import { APP_FILTER } from '@nestjs/core';
import { ErrorHandler } from './common/error-handler';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      type: 'postgresql',
      host: '127.0.0.1',
      port: 5432,
      name: 'root',
      user: 'root',
      password: 'root',
      dbName: 'edu',
      entities: ['./dist/**/entity/*.js'],
      entitiesTs: ['./src/**/entity/*.ts'],
      metadataProvider: ReflectMetadataProvider,
      debug: true,
      seeder: {
        path: './fixtures',
        defaultSeeder: 'SchoolFixtures',
      },
    }),
    SchoolModule,
    PersonModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorHandler,
    },
    AppService,
  ],
})
export class AppModule implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    // const x = await fetch('http://localhost:3000/students');
    // console.log(x);
  }
}
