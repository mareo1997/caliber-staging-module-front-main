import { LoginService } from './login.service';
import { AppRoutingModule } from './../../app-routing.module';
import { environment } from './../../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [

        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AppRoutingModule

       ],
        providers: [LoginService, AngularFireModule, AppRoutingModule],
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have postManager(email) return data', ()=>{
    service.getManagerId('testEmail').subscribe(
      response =>{
        expect(response.toString()).toEqual("1");
      }
    );

    const req = httpMock.expectOne(`${environment.BASE_URL}getmanager`);
    expect(req.request.method).toBe('POST');
    req.flush("1");
  });
});
