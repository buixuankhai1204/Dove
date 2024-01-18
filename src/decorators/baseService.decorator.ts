import {BadRequestException, createParamDecorator, ExecutionContext} from '@nestjs/common';

export const pageParams = createParamDecorator((data: unknown, ctx: ExecutionContext): {page: number, limit: number} => {
    const request = ctx.switchToHttp().getRequest();
    let page: number = request.query.page;
    if(typeof page !== "number") {
        throw new BadRequestException("type of page is not correct");
    }

    if(page === undefined) {
        page = 10;
    }

    let limit: number = request.query.limit;
    if(typeof limit !== "number") {
        throw new BadRequestException("type of limit is not correct");
    }

    if(limit === undefined) {
        limit = 10;
    }
    return {page, limit};
});
