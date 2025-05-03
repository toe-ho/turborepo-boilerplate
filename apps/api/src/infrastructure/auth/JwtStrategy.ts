import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { appConfig } from 'src/config/AppConfig';

export interface SupabaseJwtPayload {
    sub: string;
    email: string;
    role: string;
    exp: number;
    iat: number;
    [key: string]: unknown;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: appConfig.supabase.jwtSecret,
        });
    }

    async validate(payload: SupabaseJwtPayload): Promise<SupabaseJwtPayload> {
        return payload;
    }
}
