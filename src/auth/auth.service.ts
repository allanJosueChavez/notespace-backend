import { Injectable } from '@nestjs/common';

@Injectable({})

export class AuthService {
    login() {
        return { message: 'login from auth service'}
    }
    signup() {  
        return { message: 'signup from auth service'}
    }
}