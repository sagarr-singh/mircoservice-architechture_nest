import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  UseGuards,
  Patch,
  Delete,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiKeyGuard } from "./guards/apikey.guard";

@Controller("api")
@UseGuards(ApiKeyGuard)
export class GatewayController {
  constructor(
    @Inject("PRODUCTS_SERVICE") private productsClient: ClientProxy,
    @Inject("ORDERS_SERVICE") private ordersClient: ClientProxy
  ) {}

  // Products
  @Post("products")
  async createProduct(@Body() body: any) {
    return this.productsClient
      .send({ cmd: "create_product" }, body)
      .toPromise();
  }

  @Get("products")
  async listProducts() {
    return this.productsClient.send({ cmd: "list_products" }, {}).toPromise();
  }

  @Get("products/:id")
  async getProduct(@Param("id") id: string) {
    return this.productsClient.send({ cmd: "get_product" }, id).toPromise();
  }

  @Patch("products/:id")
  async updateProduct(@Param("id") id: string, @Body() body: any) {
    return this.productsClient
      .send({ cmd: "update_product" }, { id, dto: body })
      .toPromise();
  }

  @Delete("products/:id")
  async deleteProduct(@Param("id") id: string) {
    return this.productsClient.send({ cmd: "remove_product" }, id).toPromise();
  }

  // Orders
  @Post("orders")
  async createOrder(@Body() body: any) {
    return this.ordersClient.send({ cmd: "create_order" }, body).toPromise();
  }

  @Get("orders")
  async listOrders() {
    return this.ordersClient.send({ cmd: "list_orders" }, {}).toPromise();
  }

  @Get("orders/:id")
  async getOrder(@Param("id") id: string) {
    return this.ordersClient.send({ cmd: "get_order" }, id).toPromise();
  }

  @Patch("orders/:id")
  async updateOrder(@Param("id") id: string, @Body() body: any) {
    return this.ordersClient
      .send({ cmd: "update_order" }, { id, dto: body })
      .toPromise();
  }

  @Delete("orders/:id")
  async deleteOrder(@Param("id") id: string) {
    return this.ordersClient.send({ cmd: "remove_order" }, id).toPromise();
  }
}
