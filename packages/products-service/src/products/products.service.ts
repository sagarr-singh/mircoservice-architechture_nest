import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private repo: Repository<Product>,
    ) { }

    create(dto: Partial<Product>) {
        const product = this.repo.create(dto);
        return this.repo.save(product);
    }

    findAll() {
        return this.repo.find();
    }

    findOne(id: string) {
        return this.repo.findOne({ where: { id } });
    }

    update(id: string, dto: Partial<Product>) {
        return this.repo.update(id, dto);
    }

    remove(id: string) {
        return this.repo.delete(id);
    }
}
