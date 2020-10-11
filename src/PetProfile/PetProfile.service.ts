import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pet } from './PetProfiles.model';

@Injectable()
export class PetService {
  constructor(
    @InjectModel('Pet') private readonly petModel: Model<Pet>,
  ) {}

  async insertPet(PetName: string, PetBreed: string, PetGender: string, PetPicURL: string, PetStatus: string, PetWeight: Number,PetSize: Number,PetColor: string, PetCerURL:string, PetLocation:string, PetDescription:string) {
    const newPet = new this.petModel({
      PetName,
      PetBreed,
      PetGender,
      PetPicURL,
      PetStatus,
      PetWeight,
      PetSize,
      PetColor,
      PetCerURL,
      PetLocation,
      PetDescription,
    });
    const result = await newPet.save();
    return result.id as string;
  }

  async getPets() {
    const PetProfile = await this.petModel.find().exec();
    return PetProfile.map(prod => ({
      id: prod.id,
      PetName: prod.PetName,
      PetBreed: prod.PetBreed,
      PetGender: prod.PetGender,
      PetPicURL: prod.PetPicURL,
      PetStatus: prod.PetStatus,
      PetWeight: prod.PetWeight,
      PetSize: prod.PetSize,
      PetColor: prod.PetColor,
      PetCerURL: prod.PetCerURL,
      PetLocation: prod.PetLocation,
      PetDescription: prod.PetDescription,
    }));
  }

  async getSinglePet(productId: string) {
    const petProfile = await this.findPet(productId);
    return {
      id: petProfile.id,
      PetName: petProfile.PetName,
      PetBreed: petProfile.PetBreed,
      PetGender: petProfile.PetGender,
      PetPicURL: petProfile.PetPicURL,
      PetStatus: petProfile.PetStatus,
      PetWeight: petProfile.PetWeight,
      PetSize: petProfile.PetSize,
      PetColor: petProfile.PetColor,
      PetCerURL: petProfile.PetCerURL,
      PetLocation: petProfile.PetLocation,
      PetDescription: petProfile.PetDescription,
    };
  }

  async updatePet(
    productId: string,
    PetName: string,
    PetBreed: string,
    PetGender: string,
    PetPicURL: string,
    PetStatus: string,
    PetWeight: Number,
    PetSize: Number,
    PetColor: string,
    PetCerURL: string,
    PetLocation: string,
    PetDescription:string,
  ) {
    const updatedPet = await this.findPet(productId);
    if (PetName) {
      updatedPet.PetName = PetName;
    }
    if (PetBreed) {
      updatedPet.PetBreed = PetBreed;
    }
    if (PetGender) {
      updatedPet.PetGender = PetGender;
    }
    if (PetPicURL) {
      updatedPet.PetPicURL = PetPicURL;
    }
    if (PetStatus) {
      updatedPet.PetStatus = PetStatus;
    }
    if (PetWeight) {
      updatedPet.PetWeight = PetWeight;
    }
    if (PetSize) {
      updatedPet.PetSize = PetSize;
    }PetColor
    if (PetColor) {
      updatedPet.PetColor = PetColor;
    }
    if (PetCerURL) {
      updatedPet.PetCerURL = PetCerURL;
    }
    if (PetLocation) {
      updatedPet.PetLocation = PetLocation;
    }
    if (PetDescription) {
      updatedPet.PetDescription = PetDescription;
    }
    updatedPet.save();
  }
  async deletePet(prodId: string) {
    const result = await this.petModel.deleteOne({_id: prodId}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find pet profile.');
    }
  }

  private async findPet(id: string): Promise<Pet> {
    let petProfile;
    try {
      petProfile = await this.petModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find pet profile.');
    }
    if (!petProfile) {
      throw new NotFoundException('Could not find pet profile.');
    }
    return petProfile;
  }
}