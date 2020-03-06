import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
	selector: 'app-dialog-semanas-especificas',
    template: 
    `
    <h1 mat-dialog-title>Semanas Especificas</h1>
    <div mat-dialog-content>
        <p> Especifique las semanas que desea </p>
        <div>
            <mat-form-field>
                <mat-select [(ngModel)]="semana" name="semana" placeholder="Semana" required (selectionChange)="onSelectSemana()">
                    <mat-option *ngFor="let option of semanasOptions" [value]="option">{{option}}</mat-option>
                </mat-select>
            </mat-form-field>
        </div>
    </div>
    <div mat-dialog-actions align="center">
        <button mat-button (click)="onClick()">Cancelar</button>
        <button mat-button (click)="onClick()">OK</button>
    </div>
    `,
})
export class DialogSemanasEspecificasComponent {
    public semanasOptions = [1,2,3,4,5,6,7,8,9,10,11,12];
    public semana: number;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<DialogSemanasEspecificasComponent>
	) {
        this.dialogRef.disableClose = true;
    }
    
    onClick() {
		this.dialogRef.close(this.semana);
    }
    
    onSelectSemana() {
    }
}