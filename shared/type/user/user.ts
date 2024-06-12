import {GenderType} from "../enum/gender-type.enum";
import {LocationType} from "../enum/location-type.enum";
import {RoleType} from "../enum/role-type.enum";

export interface User {
  id?: string;
  name: string;
  password: string;
  email: string;
  avatarId: string;
  gender: GenderType;
  dateOfBirth: Date;
  description: string;
  location: LocationType
  profilePictureId: string;
  createdAt: Date;
  updatedAt: Date;
  role: RoleType;
}
