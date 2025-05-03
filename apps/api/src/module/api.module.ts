import { MiddlewareConsumer } from "@nestjs/common";

import { Module } from "@nestjs/common";
import { SharedModule } from "./share.module";
import { HttpLoggerMiddleware } from "src/interceptor/HttpLoggerMiddleware";

@Module({
    imports: [SharedModule],
    providers: [],
    controllers: [
        
    ],
    exports: [],
})
export class ApiModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(HttpLoggerMiddleware).forRoutes('*');
    }
}