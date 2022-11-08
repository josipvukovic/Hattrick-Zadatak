import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketAssetComponent } from './ticket-asset.component';

describe('TicketAssetComponent', () => {
  let component: TicketAssetComponent;
  let fixture: ComponentFixture<TicketAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketAssetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
