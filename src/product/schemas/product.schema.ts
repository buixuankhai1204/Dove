import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {HydratedDocument} from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop({unique: true, required: true})
    name: string

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    imageId?: string

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    categoryId: string

    @Prop({required: true})
    description!: string

    @Prop({default: []})
    size!: string[]

    @Prop({default: []})
    color!: string[]

    @Prop({default: 0})
    price: string

    @Prop({default: 0})
    isActive!: number

    @Prop({default: Date.now()})
    createdAt: Date

    @Prop({default: Date.now()})
    updatedAt: Date
}

export const ProductSchema = SchemaFactory.createForClass(Product);
