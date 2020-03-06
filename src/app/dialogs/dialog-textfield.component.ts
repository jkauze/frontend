import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
	selector: 'app-dialog-textfield',
    template: 
    `
    <h1 mat-dialog-title>{{title}}</h1>
    <div mat-dialog-content>
        <p> {{message}} </p>
        <div>
            <mat-form-field>
                <textarea matInput [(ngModel)]="field" placeholder="Ej. Necesito un televisor "></textarea>
            </mat-form-field>
        </div>
    </div>
    <div mat-dialog-actions align="center">
        <button mat-button (click)="onClick('No')">Cancelar</button>
        <button mat-button (click)="onClick('Si')">Aceptar</button>
    </div>
    `,
})
export class DialogTextFieldComponent {
    public title: string;
    public message: string;
    public field: string;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<DialogTextFieldComponent>
	) {
        this.dialogRef.disableClose = true;
        this.title = data.title;
        this.message = data.message;
    }
    
    onClick(respuesta: string) {
		this.dialogRef.close(respuesta == 'Si' ? this.field : respuesta);
    }

}