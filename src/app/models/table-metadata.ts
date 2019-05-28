export interface IColumnMetadata {
  columnName: string;
  dataType: string;
  tableName: string;
}
export class ColumnMetadata implements IColumnMetadata {
  public columnName: string;
  public dataType: string;
  public tableName: string;
  constructor(column?: Partial<IColumnMetadata>) {
    Object.assign(this, column);
  }
}
export interface ITableMetadata {
  tableName: string;
  columns: IColumnMetadata[];
}
export class TableMetadata implements ITableMetadata {
  public tableName: string;
  public columns: IColumnMetadata[];
  constructor(table?: Partial<ITableMetadata>) {
    if (table) {
      this.tableName = table.tableName;
      this.columns = table.columns.map(c => new ColumnMetadata(c) );
    }
  }
}
