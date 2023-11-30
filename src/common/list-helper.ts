export type PaginationIn = {
  page?: string;
  limit?: string;
};

export type PaginationOut = {
  page: number;
  limit: number;
  offset: number;
};

export const buildPagination = ({
  page,
  limit,
}: PaginationIn): PaginationOut => {
  const pageResult = page ? Number(page) : 1;
  const limitResult = limit ? Number(limit) : 5;
  const offset = (pageResult - 1) * limitResult;
  return {
    page: pageResult,
    limit: limitResult,
    offset,
  };
};

export const paginationDto = <T>(
  data: Array<T>,
  { page, limit, count }: Omit<PaginationOut, 'offset'> & { count: number },
) => {
  const totalPages = Math.ceil(count / limit);
  return {
    data,
    count: totalPages,
    currentPage: page,
  };
};
