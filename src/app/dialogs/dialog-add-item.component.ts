import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AppService } from 'app/app.service';
import { Items } from 'app/interfaces/items';

@Component({
  selector: 'app-dialog-add-item',
  template: `
    <h2 mat-dialog-title> Añadir Item</h2>
    <mat-dialog-content>
      <button href="#" class="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-expanded="true" data-container="true">
        {{ addItemName }}
        <strong class="caret"></strong>
      </button>
      <ul class="dropdown-menu" style="max-height:250px; overflow:auto;">
        <li *ngFor="let item of notItems"><a (click)="select(item)">{{ item?.name }}</a></li>
      </ul>
      <br>
      <input [(ngModel)]="postQuantity" placeholder="Cantidad" type="number" class="form-control" id="itemQuantity" required>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button *ngIf="addItemName != 'Item' && postQuantity > 0" mat-button mat-dialog-close class="btn btn-success" (click)="addItem()">Guardar</button>
      <button mat-button mat-dialog-close class="btn btn-danger">Cancelar</button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./dialog-add-item.component.scss']
})
export class DialogAddItemComponent implements OnInit {
  notItems = [];
  addItemName = "Item";
  quantity: number;
  postQuantity = 0;
  item: Items;

  constructor(public json: AppService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.json.getNotItems(this.data.dataKey).subscribe((data) => {
      this.notItems = data;
    });
  }

  select(item: Items){
    this.addItemName = item.name;
    this.item = item;
  }

  addItem(){
    this.json.postAddItem(this.data.dataKey, this.item.id, this.postQuantity).subscribe(
      (data) => {},
      (err) => {console.log(err)}
    );
  }
}
