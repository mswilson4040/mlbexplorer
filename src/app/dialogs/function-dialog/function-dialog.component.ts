import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { IAggregateFunction, IVisualizationConfiguration } from '../../models/visualization-configuration';

@Component({
  selector: 'app-function-dialog',
  templateUrl: './function-dialog.component.html',
  styleUrls: ['./function-dialog.component.scss']
})
export class FunctionDialogComponent implements OnInit {
  private readonly _matDialogRef: MatDialogRef<FunctionDialogComponent>;
  public functionForm: FormGroup;
  public readonly configuration: IVisualizationConfiguration;
  constructor(_matDialogRef: MatDialogRef<FunctionDialogComponent>, @Inject(MAT_DIALOG_DATA) _config: IVisualizationConfiguration) {
    this._matDialogRef = _matDialogRef;
    this.configuration = _config;
    this.functionForm = new FormGroup({
      func: new FormControl(),
      field: new FormControl(),
      groupBy: new FormControl()
    });
  }

  ngOnInit() {
  }
  submit(): void {
    this._matDialogRef.close({ ...this.functionForm.value } as IAggregateFunction);
  }
}
