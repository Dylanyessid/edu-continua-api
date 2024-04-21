import { Equal, ILike } from "typeorm";

export class FilterParser {
  operations = ['ilike', 'equals'];

  operationTransformer = {
    ilike: (value) => `%${value}%`,
    equals: (value) => value
  }

  operationFilter = {
    ilike: ILike,
    equals: Equal
  }

  checkFilters(availableFields, filter) {
    if (!availableFields.includes(filter.column)) {
      throw new Error(`Column ${filter.column} not found in available fields`);
    }
  
    if (!this.operations.includes(filter.operation)) {
      throw new Error(`Operation ${filter.operation} not found in available operations`);
    }
  }

  filterParser = (filters = [], availableFields = []) => {
    const typeOrmFilters = {};
  
    filters.forEach((filter) => {
      this.checkFilters(availableFields, filter);
      const value = this.operationTransformer[filter.operation](filter.value);
      const operationFunction = this.operationFilter[filter.operation];      
      typeOrmFilters[filter.column] = operationFunction(value);
    });
  
    return typeOrmFilters;
  }
}
