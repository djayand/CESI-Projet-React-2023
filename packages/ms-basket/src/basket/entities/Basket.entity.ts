import { ObjectId } from 'mongodb';
import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Basket {
  @ObjectIdColumn()
  @ApiProperty()
  id: ObjectId;

  @Column()
  @ApiProperty({ type: [String] })
  userId: string;

  @Column()
  @ApiProperty({ type: [String] })
  menuId: string;
}
