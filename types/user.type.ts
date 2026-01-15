export interface UserType {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  phoneNumber?: string;
  isCheckedTermsAndConditions?: boolean;
  address: any | null;
  bio: any | null;
  categories: any[];
  contractNumber: string;
  createdAt: string;
  id: string;
  location: {
    coordinates: number[];
    type: string;
  };
  locationUrl: string | null;
  photoUrl: string |null;
  status: "active";
}
