import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Menu {
  @ObjectIdColumn()
  @ApiProperty()
  id: ObjectId;

  @Column()
  @ApiProperty({ type: String })
  name: string;

  @Column()
  @ApiProperty({ type: String })
  kitchenId: string;

  @Column('array')
  @ApiProperty({ type: [String] })
  articleIds: string[];
}
