import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from './jwt.service';
import { RegisterRequestDto, LoginRequestDto, ValidateRequestDto } from '../authentifier.dto';
import { Auth } from '../authentifier.entity';
import { LoginResponse, RegisterResponse, ValidateResponse } from '../authentifier.pb';

@Injectable()
export class AuthService {
    @InjectRepository(Auth)
    private readonly repository: Repository<Auth>;

    @Inject(JwtService)
    private readonly jwtService: JwtService;

    public async register({ email, password, role }: RegisterRequestDto): Promise<RegisterResponse> {
        console.log("Register with adress " + email + " is registering...")
        let auth: Auth = await this.repository.findOne({ where: { email } });

        if (auth) {
            return { status: HttpStatus.CONFLICT, error: ['E-Mail already exists'] };
        }

        auth = new Auth();

        auth.email = email;
        auth.password = this.jwtService.encodePassword(password);
        auth.role = role;

        await this.repository.save(auth);

        return { status: HttpStatus.CREATED, error: null };
    }

    public async login({ email, password }: LoginRequestDto): Promise<LoginResponse> {
        console.log("Register with adress " + email + " is logging...")
        const auth: Auth = await this.repository.findOne({ where: { email } });

        if (!auth) {
            return { status: HttpStatus.NOT_FOUND, error: ['E-Mail not found'], token: null };
        }

        const isPasswordValid: boolean = this.jwtService.isPasswordValid(password, auth.password);

        if (!isPasswordValid) {
            return { status: HttpStatus.NOT_FOUND, error: ['Password wrong'], token: null };
        }

        const token: string = this.jwtService.generateToken(auth);

        return { token, status: HttpStatus.OK, error: null };
    }

    public async validate({ token }: ValidateRequestDto): Promise<ValidateResponse> {
        const decoded: Auth = await this.jwtService.verify(token);
        console.log(decoded)

        if (!decoded) {
            return { status: HttpStatus.FORBIDDEN, error: ['Token is invalid'], userId: null, email: null, role: null };
        }

        const auth: Auth = await this.jwtService.validateUser(decoded);

        if (!auth) {
            return { status: HttpStatus.CONFLICT, error: ['User not found'], userId: null, email: null, role: null };
        }

        return { status: HttpStatus.OK, error: null, userId: decoded.id, email: decoded.email, role: +decoded.role };
    }
}