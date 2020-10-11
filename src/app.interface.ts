import { Document } from 'mongoose';
import {ObjectID} from 'mongodb';
export interface app extends Document {
    readonly UserID: ObjectID;
    readonly PetName: String;
    readonly PetBreed: String;
    readonly PetGender: String;
    readonly PetPicURL: String;
    readonly PetStatus: String;
    readonly PetWeight: String;
    readonly PetCerURL: String;
    readonly PetSize: [{
        PetLength: Number,
        PetHeight: Number
    }];
    readonly TimeStampUpdate: Date;
}