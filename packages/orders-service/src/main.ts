import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: parseInt(process.env.ORDERS_TCP_PORT || '4002', 10),
        },
    });
    await app.listen();
    console.log(`Orders microservice listening on TCP ${process.env.ORDERS_TCP_PORT || 4002}`);
}
bootstrap();
