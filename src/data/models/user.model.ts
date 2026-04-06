export interface UserResponseModel {
    success: boolean;
    data: UserModel;
    message: string;
}

export interface UserModel {
    id: string;
    email: string;
    username: string;
    departement: string;
    is_active: boolean;
    avatar_id: string;
    avatar_url: string;
    email_verified: null;
    created_at: Date;
    updated_at: Date;
    roles: Role[];
    permissions: string[];
    profile: Profile;
}

export interface Profile {
    employeeId: string;
    name: string;
    phone_number: string;
    gender: string;
    birth_date: Date;
    address: string;
    job_title: string;
    join_date: Date;
    employment_status: string;
    emergency_contact: string;
    blood_type: string;
}

export interface Role {
    id: string;
    name: string;
    description: string;
    scope: Scope;
}

export interface Scope {
    type: string;
    value: string;
}
