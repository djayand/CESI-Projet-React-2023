import { ObjectId } from 'mongodb';
import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Kitchen {
  @ObjectIdColumn()
  @ApiProperty()
  id: ObjectId;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column()
  @ApiProperty()
  address: string;

  @Column('json')
  @ApiProperty({ description: 'Object - openHours / closeHours' })
  openingHours: { open: string; close: string };

  @Column()
  @ApiProperty({ description: 'Type of cuisine (mexican, burger, french, ...' })
  cuisineType: string;

  @Column()
  @ApiProperty({ description: 'Cash, Credit card, ...' })
  paymentOptions: string;

  @Column()
  @ApiProperty({ description: 'Special options (gluten free, vegan, etc)' })
  specialOptions: string;

  @Column()
  @ApiProperty()
  contactInfo: string;

  @Column()
  @ApiProperty({ description: 'Owner of restaurant' })
  userId: string;
}
