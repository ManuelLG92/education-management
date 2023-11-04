import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolModule } from './school/school.module';
import { PersonModule } from './person/person.module';
import { StudentModule } from './student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { StudentRepository } from './student/infrastructure/student.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'edu',
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    SchoolModule,
    PersonModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
