import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class LoginRegistrationConstantAPI{

    public RegisterAPI : string = 'api/RegistrationAPI/Register'
    public LoginAPI : string =  'api/RegistrationAPI/Login'
}