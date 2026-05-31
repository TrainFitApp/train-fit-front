import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExcelSheetData, AiTablePreview } from '../../models/ai-import';
import { Table } from '../../models/table';
import { HttpService } from '../http/http.service';

@Injectable()
export class AiImportApiService {
  constructor(private http: HttpService) {}

  public interpretExcel(
    sheets: ExcelSheetData[],
    fileName: string,
  ): Observable<AiTablePreview> {
    return this.http.post<AiTablePreview>('ai/interpret-excel', {
      sheets,
      fileName,
    });
  }

  public createTable(data: AiTablePreview): Observable<Table> {
    return this.http.post<Table>('ai/create-table', data);
  }
}
