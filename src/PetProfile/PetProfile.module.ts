import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PetController } from './PetProfile.controller';
import { PetService } from './PetProfile.service';
import { PetSchema } from './PetProfiles.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Pet', schema: PetSchema }]),
  ],
  controllers: [PetController],
  providers: [PetService],
})
export class ProductsModule {}
