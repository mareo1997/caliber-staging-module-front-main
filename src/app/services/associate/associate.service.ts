import { HttpClient } from '@angular/common/http';
import { Associate } from '../../models/associate-model/associate.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UpdateBatchPayload } from 'src/app/components/view-associate/update-batch-payload';

@Injectable({
  providedIn: 'root',
})
export class AssociateService {
  constructor(private http: HttpClient) {}

  getAllAssociates(managerId: number): Observable<Associate[]> {
    return this.http.get<Associate[]>(
      `${environment.BASE_URL}associates?manager=${managerId}`
    );
  }

  getAllNewAssociates(managerId: number): Observable<Associate[]> {
    return this.http.get<Associate[]>(
      `${environment.BASE_URL}associates/new?manager=${managerId}`
    );
  }

  updateBatch(updatePayload: UpdateBatchPayload): Observable<string> {
    return this.http.put(`${environment.BASE_URL}associates`, updatePayload, {
      observe: 'body',
      responseType: 'text',
    });
  }
}
