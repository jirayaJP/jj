import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { PetService } from './PetProfile.service';

@Controller('PetProfile')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  async addPet(
    @Body('PetName') prodTitle: string,
    @Body('PetBreed') prodDesc: string,
    @Body('PetGender') prodPrice: string,
    @Body('PetPicURL') prodPetPicURL: string,
    @Body('PetStatus') prodPetStatus: string,
    @Body('PetWeight') prodPetWeight: Number,
    @Body('PetSize') prodPetSize: Number,
    @Body('PetColor') prodPetColor: string,
    @Body('PetCerURL') prodPetCerURL: string,
    @Body('PetLocation') prodPetLocation: string,
    @Body('PetDescription') prodPetDescription: string,

  ) {
    const generatedId = await this.petService.insertPet(
      prodTitle,
      prodDesc,
      prodPrice,
      prodPetPicURL,
      prodPetStatus,
      prodPetWeight,
      prodPetSize,
      prodPetColor,
      prodPetCerURL,
      prodPetLocation,
      prodPetDescription,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllPets() {
    const PetProfile = await this.petService.getPets();
    return PetProfile;
  }

  @Get(':id')
  getPet(@Param('id') prodId: string) {
    return this.petService.getSinglePet(prodId);
  }

  @Patch(':id')
  async updatePet(
    @Param('id') prodId: string,
    @Body('PetName') prodTitle: string,
    @Body('PetBreed') prodDesc: string,
    @Body('PetGender') prodPrice: string,
    @Body('PetPicURL') prodPetPicURL: string,
    @Body('PetStatus') prodPetStatus: string,
    @Body('PetWeight') prodPetWeight: Number,
    @Body('PetSize') prodPetSize: Number,
    @Body('PetColor') prodPetColor: string,
    @Body('PetCerURL') prodPetCerURL: string,
    @Body('PetLocation') prodPetLocation: string,
    @Body('PetDescription') prodPetDescription: string

  ) {
    await this.petService.updatePet(prodId, prodTitle, prodDesc, prodPrice, prodPetPicURL, prodPetStatus, prodPetWeight,prodPetSize,prodPetColor, prodPetCerURL, prodPetLocation,prodPetDescription);
    return null;
  }

  @Delete(':id')
  async removePet(@Param('id') prodId: string) {
      await this.petService.deletePet(prodId);
      return null;
  }
}