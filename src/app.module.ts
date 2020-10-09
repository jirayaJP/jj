import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './PetProfile/PetProfile.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb://localhost:27017/PetPro',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
