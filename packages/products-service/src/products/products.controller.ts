import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { ProductsService } from "./products.service";

@Controller()
export class ProductsController {
  constructor(private svc: ProductsService) {}

  @MessagePattern({ cmd: "create_product" })
  create(dto: any) {
    return this.svc.create(dto);
  }

  @MessagePattern({ cmd: "list_products" })
  list() {
    return this.svc.findAll();
  }

  @MessagePattern({ cmd: "get_product" })
  get(id: string) {
    return this.svc.findOne(id);
  }

  @MessagePattern({ cmd: "remove_product" })
  remove(id: string) {
    return this.svc.remove(id);
  }

  @MessagePattern({ cmd: "update_product" }) 
  update(payload: { id: string; dto: any }) {
    const { id, dto } = payload;
    return this.svc.update(id, dto);
  }
}
