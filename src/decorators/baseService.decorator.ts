import {BadRequestException, createParamDecorator, ExecutionContext, Injectable} from '@nestjs/common';
import {FilterQuery, Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {skip} from "rxjs";

export type PaginatedResource<T> = {
    totalItems: number;
    items: T[];
    page: number;
    size: number;
};

export interface Pagination {
    page: number;
    limit: number;
    size: number;
    offset: number;
}

export interface Sorting {
    property: string;
    direction: string;
}

export interface Filtering {
    property: string;
    rule: string;
    value: string;
}


export enum FilterRule {
    EQUALS = 'eq',
    NOT_EQUALS = 'neq',
    GREATER_THAN = 'gt',
    GREATER_THAN_OR_EQUALS = 'gte',
    LESS_THAN = 'lt',
    LESS_THAN_OR_EQUALS = 'lte',
    LIKE = 'like',
    NOT_LIKE = 'nlike',
    IN = 'in',
    NOT_IN = 'nin',
    IS_NULL = 'isnull',
    IS_NOT_NULL = 'isnotnull',
}


export const PaginationParams = createParamDecorator((data: unknown, ctx: ExecutionContext): Pagination => {
    const req = ctx.switchToHttp().getRequest();
    const page = parseInt(req.query.page as string);
    const size = parseInt(req.query.size as string);

    if (isNaN(page) || page < 0 || isNaN(size) || size < 0) {
        throw new BadRequestException('Invalid pagination params');
    }
    if (size > 100) {
        throw new BadRequestException('Invalid pagination params: Max size is 100');
    }

    const limit = size;
    const offset = page * limit;
    return { page, limit, size, offset };
});

export const SortingParams = createParamDecorator((validParams, ctx: ExecutionContext): Sorting => {
    const req = ctx.switchToHttp().getRequest();
    const sort = req.query.sort as string;
    console.log(sort)
    if (!sort) return null;

    // check if the valid params sent is an array
    if (typeof validParams != 'object') throw new BadRequestException('Invalid sort parameter');

    // check the format of the sort query param
    const sortPattern = /^([a-zA-Z0-9]+):(asc|desc)$/;
    if (!sort.match(sortPattern)) throw new BadRequestException('Invalid sort parameter');

    // extract the property name and direction and check if they are valid
    const [property, direction] = sort.split(':');
    if (!validParams.includes(property)) throw new BadRequestException(`Invalid sort property: ${property}`);

    return { property, direction };
});

export const FilteringParams = createParamDecorator((data, ctx: ExecutionContext): Filtering => {
    const req = ctx.switchToHttp().getRequest();
    const filter = req.query.filter as string;
    if (!filter) return null;

    // // check if the valid params sent is an array
    // if (typeof data != 'object') throw new BadRequestException('Invalid filter parameter');
    //
    // // validate the format of the filter, if the rule is 'isnull' or 'isnotnull' it don't need to have a value
    // if (!filter.match(/^[a-zA-Z0-9_]+:(eq|neq|gt|gte|lt|lte|like|nlike|in|nin):[a-zA-Z0-9_,]+$/) && !filter.match(/^[a-zA-Z0-9_]+:(isnull|isnotnull)$/)) {
    //     throw new BadRequestException('Invalid filter parameter');
    // }

    // extract the parameters and validate if the rule and the property are valid
    const [property, rule, value] = filter.split(':');
    // if (!data.includes(property)) throw new BadRequestException(`Invalid filter property: ${property}`);
    // if (!Object.values(FilterRule).includes(rule as FilterRule)) throw new BadRequestException(`Invalid filter rule: ${rule}`);

    return { property, rule, value };
});


@Injectable()
export class Service<T> {
    constructor(private readonly repository: Model<T>) {}
    getWhere = (filter: Filtering): FilterQuery<Filtering> => {
        if (!filter) return {};
        if (filter.rule == FilterRule.NOT_EQUALS) return { [filter.property]: {$eq: (filter.value) }};
        if (filter.rule == FilterRule.GREATER_THAN) return { [filter.property]: {$gt: filter.value }};
        if (filter.rule == FilterRule.GREATER_THAN_OR_EQUALS) return { [filter.property]: {$gte: (filter.value) }};
        if (filter.rule == FilterRule.LESS_THAN) return { [filter.property]: {$lt: (filter.value) }};
        if (filter.rule == FilterRule.LESS_THAN_OR_EQUALS) return { [filter.property]: {$lte: (filter.value) }};
        if (filter.rule == FilterRule.IN) return { [filter.property]: {$in: filter.value }};
        if (filter.rule == FilterRule.NOT_IN) return { [filter.property]: {$nin: filter.value }};
    }
    async findAll(filter?: Filtering, sort?: Sorting, pagination?: Pagination): Promise<T[]> {
        const filterConvert: FilterQuery<Filtering> = this.getWhere(filter);
        return this.repository.find(filterConvert).skip(pagination.offset).limit(pagination.limit);
    }

    async findOne(id: string): Promise<T> {
        const data: T = await this.repository.findById(id);
        if(data === null) {
            throw new BadRequestException("this id is not exist");
        }

        return data;
    }

    async remove(id: string): Promise<T> {
        const deleteData: T = await this.repository.findByIdAndUpdate(id, {isActive: 0}, {new: true});

        if(deleteData === null) {
            throw new BadRequestException("this id is not exist");
        }

        return deleteData;
    }
}
