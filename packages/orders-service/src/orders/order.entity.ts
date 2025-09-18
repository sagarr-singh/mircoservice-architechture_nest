import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb' })
  customer: { name: string; phone: string };

  @Column({ type: 'jsonb' })
  products: Array<{ productId: string; qty: number; rate?: number }>;

  @Column('numeric', { precision: 12, scale: 2 })
  totalAmount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
