import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of, throwError } from "rxjs";
import { VMessageModule } from "src/app/shared/componets/vmessage/vmessage.module";
import { SignUpComponent } from "./signup.component";
import { SignUpService } from "./signup.service";
import { UserNotTakenValidatorService } from "./user-not-taken.validator.service";

describe ('O formulário signup', ()=> {
    var component : SignUpComponent;
    var router: Router;
    var signUPService : SignUpService;

    beforeEach(async (()=>{
        TestBed.configureTestingModule({
            declarations: [SignUpComponent],
            providers: [
                SignUpService, 
                UserNotTakenValidatorService
            ],
            imports: [
                HttpClientTestingModule,
                VMessageModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([])
            ]
        }).compileComponents;
    }));

    beforeEach (()=>{
        router = TestBed.get(Router);
        signUPService = TestBed.get(SignUpService);
        const fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it ('deve ser instanciado', ()=> {
        expect (component).toBeTruthy();
    });

    it ('deve cadastrar um usuário', ()=> {
        const navigateSpy = spyOn(router, "navigate");
        spyOn(signUPService, "signup").and.returnValue(of(null));

        component.signupForm.get('email').setValue('alvaro@alvaro.com');
        component.signupForm.get('fullName').setValue('Alvaro');
        component.signupForm.get('userName').setValue('alvaro');
        component.signupForm.get('password').setValue('123');
        component.signUp();

        expect (navigateSpy).toHaveBeenCalledWith([""]);
    });

    it ('deve realizar o log caso ocorra algum erro', ()=> {
        spyOn(signUPService, "signup").and.returnValue(throwError("Teste de erro"));
        
        component.signupForm.get('email').setValue('alvaro@alvaro.com');
        component.signupForm.get('fullName').setValue('Alvaro');
        component.signupForm.get('userName').setValue('alvaro');
        component.signupForm.get('password').setValue('123');
        
        const spyLog = spyOn(console, 'log');

        component.signUp();

        expect(spyLog).toHaveBeenCalledWith("Teste de erro");
    });
});