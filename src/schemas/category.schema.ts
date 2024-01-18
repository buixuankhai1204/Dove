import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {HydratedDocument} from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
    @Prop({unique: true, required: true})
    name: string

    @Prop()
    description?: string

    @Prop({default: 0})
    isActive: number

    @Prop({default: Date.now()})
    createdAt: Date

    @Prop({default: Date.now()})
    updatedAt: Date
}

export const CategorySchema = SchemaFactory.createForClass(Category);
