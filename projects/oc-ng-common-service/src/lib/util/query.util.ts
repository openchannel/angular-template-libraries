export class QueryUtil {

  public static DEFAULT_PAGE_LIMIT = 10;

  public static getAndQuery(queries: string[]): string {
    if (queries && queries.length > 0) {
      return `{'$and': [${queries.join(',')}]}`;
    }
    return '';
  }

  public static getPaginationQuery(pageNumber: number, limit: number, defaultLimit?: number): string {
    const normalizedDefaultLimit = (defaultLimit > 0) ? defaultLimit : QueryUtil.DEFAULT_PAGE_LIMIT;
    const normalizedPageNumber = (pageNumber >= 1) ? pageNumber : 1;
    const normalizedLimit = (limit >= 0) ? limit : normalizedDefaultLimit;
    return `pageNumber=${normalizedPageNumber}&limit=${normalizedLimit}`;
  }

  public static getSearchTextQuery(searchText: string, searchByFields: string []): string {
    if (searchText && searchByFields && searchByFields.length > 0) {
      return `text=${searchText}&fields=[${searchByFields.map(field => `\'${field}\'`).join(',')}]`;
    }
    return null;
  }

  public static params(...param): string {
    const newParam = param.filter(k => k);
    if (newParam && newParam.length > 0) {
      return `?${newParam.join('&')}`;
    }
    return '';
  }

  public static safe(key: string, value: any): string {
    if (value) {
      return `${key}=${value}`;
    }
    return '';
  }
}
