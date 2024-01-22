import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {HydratedDocument} from 'mongoose';

export type ImageDocument = HydratedDocument<Image>;

@Schema()
export class Image {
    @Prop({unique: true, required: true})
    name: string

    @Prop()
    prefix: string

    @Prop({required: true})
    files: string[]

    @Prop()
    type?: string

    @Prop({default: 1})
    isActive: number

    @Prop({default: Date.now()})
    createdAt: Date

    @Prop({default: Date.now()})
    updatedAt: Date
}

export const ImageSchema = SchemaFactory.createForClass(Image);
