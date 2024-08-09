import { AppRoutingModule } from './../../app-routing.module';
import { LoginService } from './../../services/login-service/login.service';
import { environment } from './../../../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AngularFireModule } from '@angular/fire';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, 
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AppRoutingModule
       ],
        providers: [ HttpClientModule, AngularFireModule, LoginService, AppRoutingModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
