export class Room {

    public id: String;
    public name: String;
    public owner_id: String;
    public manager_id: String;
    public is_active: Boolean;
    public description: String;
    public type: String;
    public last_used: Date;
    public first_used: Date;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.name = obj && obj.name || null;
        this.owner_id = obj && obj.owner_id || null;
        this.manager_id = obj && obj.manager_id || null;
        this.is_active = obj && obj.is_active || null;
        this.description = obj && obj.description || null;
        this.type = obj && obj.type || null;
        this.last_used = obj && obj.last_used || null;
        this.first_used = obj && obj.first_used || null;
    }
    
}