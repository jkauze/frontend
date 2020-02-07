export interface Rooms {
    id: string; //MYS-111
    name: string; //SALA A
    owner_id: string; //CHANG
    manager_id: string; //LDAC
    is_active: boolean;
    description: string; //Descripcion de la sala
    type: string; //Sala o lab
    last_used?: Date;
    first_used?: Date;
}
