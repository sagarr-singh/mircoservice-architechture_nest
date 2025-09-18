import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private svc: OrdersService) {}

  @MessagePattern({ cmd: 'create_order' })
  create(dto: any) {
    return this.svc.create(dto);
  }

  @MessagePattern({ cmd: 'list_orders' })
  list() {
    return this.svc.findAll();
  }

  @MessagePattern({ cmd: 'get_order' })
  get(id: string) {
    return this.svc.findOne(id);
  }
}
