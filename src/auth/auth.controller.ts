import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './DTO/register.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiConflictResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { LoginDto } from './DTO/login.dto';
import { LoginResponseDto } from './DTO/login-response.dto';
import { GoogleService } from './google-auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private googleService: GoogleService
    ){}
    
    @Post('register')
    @ApiBody({type: RegisterUserDto})
    @ApiCreatedResponse({
        description: "Usuário registrado com sucesso!"
    })
    @ApiConflictResponse({
        description: "Email já em uso!"
    })
    async registerUser(@Body() userData: RegisterUserDto){
        return this.authService.registerUser(userData)
    }

    @Post('login')
    @ApiBody({type: LoginDto})
    async login(@Body() credentials: LoginDto): Promise<LoginResponseDto> {
        return this.authService.login(credentials);
    }

     @Post('google')
    async loginWithGoogle(@Body() body: {idToken: string}){
        const access_token = await this.googleService.verify(
            body.idToken
        )

        return { access_token }
    }

}