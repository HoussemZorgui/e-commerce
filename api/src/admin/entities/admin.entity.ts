import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;
@Schema({ timestamps: true })
export class Admin {
  items: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
