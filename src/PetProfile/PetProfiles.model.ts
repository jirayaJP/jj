import * as mongoose from 'mongoose';

export const PetSchema = new mongoose.Schema({
  PetName: { type: String, required: true },
  PetBreed: { type: String, required: true },
  PetGender: { type: String, required: true },
  PetPicURL: { type: String, required: true },
  PetStatus: { type: String, required: true },
  PetWeight: { type: Number, required: true },
  PetSize: { type: Number, required: true },
  PetColor: { type: String, required: true },
  PetCerURL: { type: String, required: true },
  PetLocation: { type: String, required: true },
  PetDescription: { type: String, required: true },
});

export interface Pet extends mongoose.Document {
  id: string;
  PetName: string;
  PetBreed: string;
  PetGender: string;
  PetPicURL: string;
  PetStatus: string;
  PetWeight: Number;
  PetSize: Number;
  PetColor: string;
  PetCerURL: string;
  PetLocation: string;
  PetDescription: string;
}
