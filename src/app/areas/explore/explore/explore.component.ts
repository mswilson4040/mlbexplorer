import { Component, OnInit, ViewChild } from '@angular/core';
import { ExploreService } from '../../../services/explore.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatCheckboxChange, MatDialog, MatSort, MatTableDataSource, MatTreeNestedDataSource, SortDirection } from '@angular/material';
import { IColumnMetadata, ITableMetadata } from '../../../models/table-metadata';
import { IAggregateFunction, IVisualizationConfiguration, VisualizationConfiguration } from '../../../models/visualization-configuration';
import { FunctionDialogComponent } from '../../../dialogs/function-dialog/function-dialog.component';


@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  private readonly exploreService: ExploreService;
  private readonly matDialog: MatDialog;
  public displayColumns: string[];
  public treeControl: NestedTreeControl<any>;
  public dataSource: MatTreeNestedDataSource<any>;
  public tableDataSource: MatTableDataSource<any>;
  public configuration: IVisualizationConfiguration;
  @ViewChild(MatSort) matSort: MatSort;
  constructor(explore: ExploreService, _matDialog: MatDialog) {
    this.exploreService = explore;
    this.matDialog = _matDialog;
    this.displayColumns = [];
    this.treeControl = new NestedTreeControl(node => node.columns);
    this.dataSource = new MatTreeNestedDataSource<ITableMetadata>();
    this.tableDataSource = new MatTableDataSource();
    this.configuration = new VisualizationConfiguration();
  }
  async ngOnInit() {
    const tables = await this.exploreService.getTables();
    this.dataSource.data = tables;
    this.matSort.sortChange.subscribe( this.onSort.bind(this) );
    this.tableDataSource.sort = this.matSort;
    console.log(tables);
  }
  async fetchData(): Promise<void> {
    const data = await this.exploreService.fetchSampleData(this.configuration);
    this.tableDataSource.data = data;
    console.log(data);
  }
  async onColumnSelected(evt: MatCheckboxChange, column: IColumnMetadata): Promise<void> {
    if (evt.checked) {
      this.configuration.addColumn(column);
    } else {
      this.configuration.removeColumn(column);
    }
    console.log(this.configuration);
    this.displayColumns = this.configuration.getDisplayColumns();
    await this.fetchData();
  }
  async onSort(column: { active: string, direction: SortDirection }): Promise<void> {
    const columnName = column.active.toLocaleLowerCase();
    const table = this.configuration.tableConfigs.find(t => !!t.columns.find( c => c.columnName.toLowerCase() === columnName ));
    if (table) {
      const columnToSort = table.columns.find( c => c.columnName.toLowerCase() === columnName);
      if (columnToSort) {
        columnToSort.sortDirection = column.direction;
        await this.fetchData();
      }
    }
  }
  async onRightClick(column: IColumnMetadata) {
    console.log(column);
  }
  async addFunction(): Promise<void> {
    const dlgRef = this.matDialog.open(FunctionDialogComponent, { data: this.configuration });
    const result: IAggregateFunction = await dlgRef.afterClosed().toPromise();
    if (result) {
      const table = this.configuration.tableConfigs.find( t => !!t.columns.find( c => c.internalName === result.field ));
      if (table) {
        const column = table.columns.find( c => c.internalName === result.field );
        if (column) {
          column.addAggregateFunction(result);
        }
        await this.fetchData();
      }
    }
    console.log('dialog result', result);
  }
  /**
   * Required for Mat Tree
   * @param idx
   * @param table
   */
  hasChild(idx: number, table: ITableMetadata): boolean {
    return !!Array.isArray( table.columns ) && table.columns.length > 0;
  }

}
