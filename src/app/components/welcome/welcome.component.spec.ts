// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { WelcomeComponent } from './welcome.component';
// import { Router } from '@angular/router';
// import { ButtonComponent } from '../button/button.component';
// import { IonicModule } from '@ionic/angular';
// import { By } from '@angular/platform-browser';

// describe('WelcomeComponent', () => {
//   let component: WelcomeComponent;
//   let fixture: ComponentFixture<WelcomeComponent>;
//   let routerSpy: jasmine.SpyObj<Router>;

//   beforeEach(async () => {
//     // Criar um mock do Router
//     routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

//     await TestBed.configureTestingModule({
//       imports: [IonicModule.forRoot(), WelcomeComponent],
//       providers: [{ provide: Router, useValue: routerSpy }],
//     }).compileComponents();

//     fixture = TestBed.createComponent(WelcomeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges(); // Disparar ciclo de vida do Angular
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should have correct initial values for properties', () => {
//     expect(component.pageTitle).toBe('Tic-tac-toe');
//     expect(component.gameLogo).toBe('/assets/tictactoe.png');
//     expect(component.buttonLabel).toBe('start');
//   });

//   it('should render the page title in the template', () => {
//     const titleElement = fixture.debugElement.query(By.css('ion-label.title'));
//     expect(titleElement.nativeElement.textContent.trim()).toBe('Tic-tac-toe');
//   });

//   it('should render the logo with the correct src attribute', () => {
//     const logoElement = fixture.debugElement.query(By.css('ion-img'));
//     expect(logoElement.attributes['src']).toBe('/assets/tictactoe.png');
//   });

//   it('should call init() and navigate to /game when the button is clicked', () => {
//     spyOn(component, 'init').and.callThrough();

//     // Simular clique no botão
//     const buttonDebugElement = fixture.debugElement.query(
//       By.directive(ButtonComponent),
//     );
//     buttonDebugElement.triggerEventHandler('triggerClick', null);

//     expect(component.init).toHaveBeenCalled();
//     expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/game');
//   });
// });
