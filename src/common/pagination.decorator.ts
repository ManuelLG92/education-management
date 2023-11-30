import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { QueryDto } from '../school/modules/season/modules/course/modules/section/controllers/dto/create-section.dto';
import { validateOrReject } from 'class-validator';
import { buildPagination, PaginationOut } from './list-helper';

export type PaginationWithLike = {
  like?: string;
} & PaginationOut;
export const PaginationDecorator = createParamDecorator(
  async (
    data: Array<{ prop: string; required?: boolean }> = [],
    ctx: ExecutionContext,
  ): Promise<PaginationWithLike> => {
    const request = ctx.switchToHttp().getRequest();
    const validateQuery = plainToInstance(QueryDto, request.query);
    try {
      await validateOrReject(validateQuery);
    } catch (error) {
      if (Array.isArray(error)) {
        const errorMessages = error
          .map((item) => Object.values(item.constraints))
          .flat();
        throw new BadRequestException(
          `Validation failed: ${errorMessages.join(', ')}`,
        );
      }
      throw error;
    }
    const extraProps =
      data?.reduce((acc, current) => {
        const { required, prop } = current;
        const value = validateQuery[prop];
        if (required && !value) {
          throw new InternalServerErrorException(
            `Duplicated extra property ${current} in validated query with value ${value}`,
          );
        }
        return { ...acc, ...(value ? { [prop]: value } : {}) };
      }, {}) ?? {};

    return {
      ...buildPagination({
        page: validateQuery.page,
        limit: validateQuery.limit,
      }),
      ...extraProps,
    };
  },
);
