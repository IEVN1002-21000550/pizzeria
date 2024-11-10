import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListapedidoComponent } from './listapedido.component';

describe('ListapedidoComponent', () => {
  let component: ListapedidoComponent;
  let fixture: ComponentFixture<ListapedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListapedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListapedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
