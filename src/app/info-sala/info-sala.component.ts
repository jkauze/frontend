import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { USER_TYPE } from 'app/interfaces/user';
import { Rooms } from 'app/interfaces/rooms';
import { MatDialog } from '@angular/material';
import { DialogUploadImageComponent } from 'app/dialogs/dialog-upload-image.component';
import { DialogAddItemComponent } from 'app/dialogs/dialog-add-item.component';

const API = environment.api_url;

@Component({
  selector: 'app-info-sala',
  templateUrl: './info-sala.component.html',
  styleUrls: ['./info-sala.component.scss']
})
export class InfoSalaComponent implements OnInit {
  public rooms = [];
  public items = [];
  public notItems = [];
  public room: Rooms;

  croppedImage: string = "";
  editItems: boolean = false;
  itemQuantityArray = [];
  eliminar = false;
  
  private url: string ='salas/';
  private idroom: string;
  private urlitem: string = '/items';
  public picture: string = '';
  public is_admin: boolean;
  public active: boolean = true;
  public edit: boolean = false;

  constructor(public json: AppService, private activatedRoute: ActivatedRoute, public dialog: MatDialog) { 
    this.idroom = this.activatedRoute.snapshot.params['rid'];
  }

  ngOnInit() {
    this.json.getRooms(this.url + this.idroom).subscribe((data) => {
      this.rooms = data;
      this.room = this.rooms[0];
      this.picture = API + this.url + this.idroom + '/picture';
    });
    
    this.json.getItems(this.url + this.idroom + this.urlitem).subscribe((data) => {
      this.items = data;
    });
    this.json.isUserType(USER_TYPE.LAB_ADMIN).then(isAdmin => { this.is_admin = isAdmin; });
  }

  openDialog(){
    let dialogRef = this.dialog.open(DialogUploadImageComponent,{
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe( data => {
      this.croppedImage = data;
    });
  }

  isEdit(){
    this.edit = true;
  }

  isActive(){
    // Verificar si puede desactivar la sala
    this.active = false;
  }

  sumbitEdit(){
    const changes = { name: this.room.name, description: this.room.description, is_active: String(this.room.is_active) };
    this.json.updateRoom(this.room.id,changes).subscribe(
      (data) => {},
      (err) => {console.log(err)}
    );
    this.edit = false;
    this.editItems = false;
    if (this.croppedImage != ""){
      console.log(this.croppedImage)
      this.json.postImagenSala(this.room.id, this.croppedImage).subscribe(
        (data) => {},
        (err) => {console.log(err)}
      );
    }
    this.ngOnInit();
  }

  editarItems(){
    this.editItems = true;
    for (let i = 0; i < this.items.length; i++) {
      this.itemQuantityArray[i] = null;
    }
  }

  cancel(){
    this.ngOnInit();
    this.croppedImage = '';
    this.edit = false;
    this.editItems = false;
  }
  cancelEditItems(){
    this.editItems = false;
    this.itemQuantityArray = [];
    this.eliminar = false;
  }
  saveEditItems(){
    this.editItems = false;
    this.eliminar = false;
    for (let i = 0; i < this.items.length; i++) {
      if (this.itemQuantityArray[i] != null){
        this.items[i].quantity = parseInt(this.itemQuantityArray[i]);
        this.json.putItemQuantity(this.room.id, this.items[i].id, this.items[i].quantity).subscribe(
          (data) => {},
          (err) => {console.log(err)}
        );
      }
    }
  }

  agregarItems(){
    let dialogRef = this.dialog.open(DialogAddItemComponent,{
      height: '250px',
      width: '300px',
      data: {
        dataKey: this.room.id
      }
    });
    dialogRef.afterClosed().subscribe( data => {
      console.log(data);
    });
  }

  eliminarItems(){
    this.editItems = true;
    this.eliminar = true;
  }

  eliminarItem(position: number){
    this.json.putRemoveItem(this.room.id,this.items[position].id).subscribe((data) => {
      this.items = data;
      if (data.length == 0){
        this.ready();
      }
    }
    );
  }

  ready(){
    this.eliminar = false;
    this.editItems = false;
  }
}
