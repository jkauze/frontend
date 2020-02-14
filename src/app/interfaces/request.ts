export interface Request {
    requester_id: string;
    room_id: string;
    name: string;
    subject_id: string;
    send_time: Date;
    reason?: string;
    material_needed?: string;
    type: number;
}
