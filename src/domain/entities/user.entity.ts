/**
 * Domain Entity: User
 */

export interface User {
    id: string;
    email: string;
    username: string;
    departement: string;
    isActive: boolean;
    avatarId: string;
    avatarUrl: string;
    emailVerified: null;
    createdAt: Date;
    updatedAt: Date;
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