import { IColumnMetadata } from './table-metadata';
import { SortDirection } from '@angular/material';

export interface IAggregateFunction {
  func: 'AVG' | 'COUNT' | 'MIN' | 'MAX' | 'SUM';
  field: string;
  groupBy: string;
}

export interface IColumnConfiguration {
  columnName: string;
  dataType: string;
  internalName: string;
  funcs: IAggregateFunction[];
  sortDirection: SortDirection;
  tableName: string;
  addAggregateFunction(func: IAggregateFunction): void;
}
export class ColumnConfiguration implements IColumnConfiguration {
  public columnName: string;
  public dataType: string;
  public internalName: string;
  public funcs: IAggregateFunction[];
  public sortDirection: SortDirection;
  public tableName: string;

  constructor(column: IColumnMetadata) {
    this.columnName = column.columnName;
    this.dataType = column.dataType;
    this.sortDirection = '';
    this.tableName = column.tableName;
    this.internalName = `${this.tableName}.${this.columnName}`;
  }
  addAggregateFunction( func: IAggregateFunction ): void {
    this.funcs = Array.isArray(this.funcs) ? this.funcs : [];
    this.funcs.push(func);
  }
}
export interface ITableConfiguration {
  tableName: string;
  columns: IColumnConfiguration[];
  isInitialTable: boolean;
  addColumn(column: IColumnConfiguration): void;
  removeColumn(column: IColumnConfiguration | IColumnMetadata): void;
}
class TableConfiguration implements ITableConfiguration {
  public tableName: string;
  public columns: IColumnConfiguration[];
  public isInitialTable: boolean;
  constructor(tableName: string, isInitialTable: boolean) {
    this.tableName = tableName;
    this.isInitialTable = isInitialTable;
  }
  addColumn(column: IColumnConfiguration): void {
    this.columns = Array.isArray(this.columns) ? this.columns : [];
    const columnExists: IColumnConfiguration = this.columns.find(c => c.columnName === column.columnName);
    if (columnExists) {
      throw new Error(`The column ${column.columnName} already exists!`);
    }
    this.columns.push(column);
  }
  removeColumn(column: IColumnConfiguration): void {
    if (Array.isArray(this.columns)) {
      this.columns = this.columns.filter( c => c.columnName !== column.columnName );
    }
  }
}
export interface IVisualizationConfiguration {
  name: string;
  tableConfigs: ITableConfiguration[];
  addColumn(column: IColumnMetadata): void;
  getDisplayColumns(): string[];
  removeColumn(column: IColumnConfiguration | IColumnMetadata): void;
}
export class VisualizationConfiguration implements IVisualizationConfiguration {
  public name: string;
  public tableConfigs: ITableConfiguration[];
  constructor() {}
  addColumn(column: IColumnMetadata): void {
    this.tableConfigs = Array.isArray(this.tableConfigs) ? this.tableConfigs : [];
    const isEntryTable: boolean = this.tableConfigs.length === 0;
    const columnConfig: IColumnConfiguration = new ColumnConfiguration(column);
    const matchedTable: ITableConfiguration = this.tableConfigs.find((t: ITableConfiguration) => t.tableName === column.tableName);
    if (matchedTable) {
      matchedTable.addColumn(columnConfig);
      return;
    }
    const tableConfig = new TableConfiguration(column.tableName, isEntryTable);
    tableConfig.addColumn(columnConfig);
    this.tableConfigs.push(tableConfig);
  }
  removeColumn(column: IColumnMetadata): void {
    if (Array.isArray(this.tableConfigs)) {
      const table: ITableConfiguration = this.tableConfigs.find( t => t.tableName === column.tableName );
      if (table) {
        table.removeColumn(column);
      } else {
        throw new Error(`Column ${column.columnName} does not exist`);
      }
    }
  }
  getDisplayColumns(): string[] {
    if (Array.isArray(this.tableConfigs)) {
      const columns: string[] = [];
      this.tableConfigs.forEach( t => t.columns.forEach( c => {
        const firstLetter = c.columnName.substring(0, 1);
        const remainingLetters = c.columnName.substring(1, c.columnName.length);
        columns.push(`${firstLetter.toLowerCase()}${remainingLetters}`);
      } ) );
      return columns;
    }
    return [];
  }
}
