import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolModule } from './school/school.module';
import { PersonModule } from './person/person.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      type: 'postgresql',
      host: '127.0.0.1',
      port: 5432,
      name: 'root',
      password: 'root',
      dbName: 'edu',
      // entities: ['./src/**/persistence/*.repository.js'],
      entities: ['./**/persistence/*.repositorymk.js'],
      // entitiesTs: ['./dist/**/persistence/*.repository.ts'],
      entitiesTs: ['./**/persistence/*.repositorymk.ts'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'edu',
      logging: true,
    }),
    SchoolModule,
    PersonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    // const x = await fetch('http://localhost:3000/students');
    // console.log(x);
  }
}
