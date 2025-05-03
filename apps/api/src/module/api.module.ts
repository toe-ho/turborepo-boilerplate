import { MiddlewareConsumer } from "@nestjs/common";

import { Module } from "@nestjs/common";
import { SharedModule } from "./share.module";
import { HttpLoggerMiddleware } from "src/interceptor/HttpLoggerMiddleware";
import { HealthCheckController } from 'src/presentation/controllers/impl/HealthCheckController';
import { UserController } from 'src/presentation/controllers/impl/UserController';
@Module({
    imports: [SharedModule],
    providers: [],
    controllers: [
        HealthCheckController,
        UserController,
    ],
    exports: [],
})
export class ApiModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(HttpLoggerMiddleware).forRoutes('*');
    }
}