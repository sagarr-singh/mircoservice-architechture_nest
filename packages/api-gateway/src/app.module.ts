import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GatewayController } from './gateway.controller';
import { ApiKeyGuard } from './guards/apikey.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ClientsModule.register([
            {
                name: 'PRODUCTS_SERVICE',
                transport: Transport.TCP,
                options: { host: 'localhost', port: parseInt(process.env.PRODUCTS_TCP_PORT || '4001', 10) },
            },
            {
                name: 'ORDERS_SERVICE',
                transport: Transport.TCP,
                options: { host: 'localhost', port: parseInt(process.env.ORDERS_TCP_PORT || '4002', 10) },
            },
        ])

    ],
    controllers: [GatewayController],
    providers: [ApiKeyGuard],
})
export class AppModule { }
