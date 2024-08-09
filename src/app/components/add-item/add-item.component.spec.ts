import { Swot } from './../../models/swot-model/swot';
import { SwotService } from './../../services/swot/swot.service';

import { AppRoutingModule } from './../../app-routing.module';
import { environment } from './../../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AddItemComponent } from './add-item.component';
import { FormsModule } from '@angular/forms';

describe('AddItemComponent', () => {
  let component: AddItemComponent;
  let fixture: ComponentFixture<AddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AppRoutingModule,
        FormsModule
       ],
        providers: [ HttpClientModule, AngularFireModule, AppRoutingModule, SwotService, FormsModule, Swot],
      declarations: [ AddItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', ()  => {
    expect(component).toBeTruthy();
  });
});
