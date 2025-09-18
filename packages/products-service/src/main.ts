import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: parseInt(process.env.PRODUCTS_TCP_PORT || '4001', 10),
        },
    });
    await app.listen();
    // optional log
    console.log(`Products microservice listening on TCP ${process.env.PRODUCTS_TCP_PORT || 4001}`);
}
bootstrap();
