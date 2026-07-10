import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { firstValueFrom } from 'rxjs';
import { AiImportApiService } from './ai-import-api.service';
import { ExcelSheetData, AiTablePreview } from '../../models/ai-import';
import { Table } from '../../models/table';

@Injectable()
export class AiImportService {
  constructor(private aiImportApi: AiImportApiService) {}

  public async parseExcel(file: File): Promise<{
    sheets: ExcelSheetData[];
    fileName: string;
  }> {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });
    const sheets: ExcelSheetData[] = [];

    for (const sheetName of workbook.SheetNames) {
      const sheet = workbook.Sheets[sheetName];
      const rows: any[][] = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: '',
      });
      sheets.push({ name: sheetName, rows });
    }

    const fileName = file.name.replace(/\.(xlsx|xls|csv)$/i, '');

    return { sheets, fileName };
  }

  public async interpretExcel(
    sheets: ExcelSheetData[],
    fileName: string
  ): Promise<AiTablePreview> {
    return firstValueFrom(
      this.aiImportApi.interpretExcel(sheets, fileName)
    );
  }

  public async createTable(data: AiTablePreview): Promise<Table> {
    return firstValueFrom(this.aiImportApi.createTable(data));
  }
}
