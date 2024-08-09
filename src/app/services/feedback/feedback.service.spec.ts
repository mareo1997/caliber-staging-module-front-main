import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Manager } from 'src/app/models/manager-model/manager';
import { environment } from 'src/environments/environment';

import { FeedbackService } from './feedback.service';
const dummydata = {
  id: 1,
  managerId: 2,
  date: null,
  content: "content",
  associateId: 2,
  manager: null
}

const dummydataForAdding = {
  id: 5,
  managerId: 2,
  date : new Date,
  content: "content",
  associateId: 2,
  manager : new Manager (2)
}
describe('FeedbackService', () => {
  let service: FeedbackService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AppRoutingModule,
        HttpClientTestingModule
      ],
      providers: [HttpClientModule, AngularFireModule, AppRoutingModule, FeedbackService],
    });
    service = TestBed.inject(FeedbackService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deletes feedback and returns the posted data as a response', () => {
    service.deleteFeedback(1).subscribe((res) => {
      expect(res.valueOf()).toEqual(dummydata.toString());
    });
    const req = httpMock.expectOne("http://localhost:8081/feedback/1");
    expect(req.request.method).toBe('DELETE');
  });

  it('adds feedback and returns the posted feedback as a response', () => {
    service.addFeedback(dummydataForAdding).subscribe((res) => {
      expect(res.valueOf()).toEqual(dummydataForAdding.toString());
    });
    let associateId = dummydataForAdding.associateId;
    const req = httpMock.expectOne((`${environment.BASE_URL}feedback/${associateId}`));
    expect(req.request.method).toBe('POST');
  });

  it('updates feedback and returns the posted feedback as a response', () => {
    service.updateFeedback(dummydataForAdding).subscribe((res) => {
      expect(res.toString()).toEqual(dummydataForAdding.toString());
    });
    let feedbackId = dummydataForAdding.id;
    const req = httpMock.expectOne((`${environment.BASE_URL}feedback/${feedbackId}`));
    expect(req.request.method).toBe('PUT');
  });
});
