import { Photo } from "./photo";

export interface User {
  username: string;
  token: string;
  photoUrl: string;
}

export interface Member {
    id: number;
    userName: string;
    phototUrl: string;
    age: number;
    knownAs: string;
    created: Date;
    lastActive: Date;
    gender: string;
    introduction: string;
    lookingFor: string;
    interests: string;
    city: string;
    country: string;
    photos: Photo[];
  }
  
