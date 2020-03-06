export interface Request {
    id: string;
    requester_id: string;
    room_id: string;
    name: string;
    subject_id: string;
    send_time: Date;
    reason?: string;
    material_needed?: string;
    type: number;
    status: string;
}

export interface PutRequest {
    reason: string;
    status: string;
}