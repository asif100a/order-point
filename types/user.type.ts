export interface UserType {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    phoneNumber?: string;
    isCheckedTermsAndConditions?: boolean;
}