import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { firstValueFrom } from 'rxjs';
import { AiImportApiService } from './ai-import-api.service';
import { AiTablePreview, ExcelSheetData } from '../../models/ai-import';
import { Table } from '../../models/table';

@Injectable()
export class AiImportService {
  constructor(private aiImportApi: AiImportApiService) {}

  public sanitizeExcel(file: File): Promise<{
    sheets: ExcelSheetData[];
    fileName: string;
  }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const buffer = reader.result as ArrayBuffer;
          const workbook = XLSX.read(buffer, { type: 'array' });
          const sheets: ExcelSheetData[] = [];

          for (const sheetName of workbook.SheetNames) {
            const sheet = workbook.Sheets[sheetName];
            const rows: any[][] = XLSX.utils.sheet_to_json(sheet, {
              header: 1,
              defval: '',
            });

            const cleanRows = rows
              .map((row) =>
                row.map((cell) =>
                  typeof cell === 'string' ? cell.trim() : cell,
                ),
              )
              .filter((row) => row.some((cell) => cell !== ''));

            if (cleanRows.length > 0) {
              sheets.push({ name: sheetName, rows: cleanRows });
            }
          }

          const fileName = file.name.replace(/\.(xlsx|xls|csv)$/i, '');
          resolve({ sheets, fileName });
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsArrayBuffer(file);
    });
  }

  public async interpretExcel(file: File): Promise<AiTablePreview> {
    const { sheets, fileName } = await this.sanitizeExcel(file);
    return firstValueFrom(
      this.aiImportApi.interpretExcel(sheets, fileName),
    );
  }

  public async createTable(data: AiTablePreview): Promise<Table> {
    return firstValueFrom(this.aiImportApi.createTable(data));
  }
}
