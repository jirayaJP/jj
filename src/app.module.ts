import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './PetProfile/PetProfile.module';
//mongodb+srv://worker:LpHNPZwDA4a36EH@cluster0.4yw9h.azure.mongodb.net/wan?retryWrites=true&w=majority
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