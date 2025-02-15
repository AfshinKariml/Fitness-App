import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class PersianPaginationIntl extends MatPaginatorIntl {
  
  override itemsPerPageLabel = 'مورد در هر صفحه';

  
  override nextPageLabel = 'صفحه بعد';

  
  override previousPageLabel = 'صفحه قبلی';

  
  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    const start = page * pageSize + 1;
    const end = Math.min((page + 1) * pageSize, length);
    return `${start}-${end} از ${length}`;
  };
}