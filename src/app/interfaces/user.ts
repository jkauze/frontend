export interface User {
    id: string;
    name: string;
    email: string;
    type: number;
    is_active: boolean;
    chief: string;
}

export const USER_TYPE = {
    DEPARTMENT: 0,
    STUDENT: 1111,
    TEACHER: 2222,
    LAB_F: 3333,
    LAB_ADMIN: 4444
}