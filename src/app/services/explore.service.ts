import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ITableMetadata, TableMetadata } from '../models/table-metadata';
import { IVisualizationConfiguration } from '../models/visualization-configuration';

@Injectable({
  providedIn: 'root'
})
export class ExploreService {
  private readonly httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }
  async getTables(): Promise<ITableMetadata[]> {
    const tables =  await this.httpClient.get<ITableMetadata[]>(`${environment.api}/explore/tables`).toPromise();
    return tables.map(t => new TableMetadata(t) );
  }
  async fetchSampleData(config: IVisualizationConfiguration): Promise<any[]> {
    const response = await this.httpClient.post<any[]>(`${environment.api}/explore/sample`, config).toPromise();
    return response;
  }
}
