import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SummaryComponent } from '../summary/summary.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [{path: 'summary', component: SummaryComponent}]
        ),
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Nutrition Analysis'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Nutrition Analysis');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.highlight-card span').textContent).toContain('Nutrition Analysis');
  });

  it('should render input elements', () => {
    const compiled = fixture.debugElement.nativeElement;
    const titleInput = compiled.querySelector('input[id="iTitle"]');
    const summaryInput = compiled.querySelector('textarea[id="iSummary"]');

    expect(titleInput).toBeTruthy();
    expect(summaryInput).toBeTruthy();
  });

  it('should test input errors', () => {
    let firstNameValidationError: DebugElement;
    fixture.detectChanges(); // run change detection
    firstNameValidationError = fixture.debugElement.query(By.css('.alert-danger'));
    // the validation error should be found:
    expect(firstNameValidationError).toBeTruthy();
  });

  it("should enable button when input and textArea is not empty", () => {
    component.model.iTitle = "Milk";
    component.model.iSummary = "1 liter milk";
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("button"));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('should exist "onSubmit"', function () {
    expect(component.onSubmit).toBeDefined();
  });

});
