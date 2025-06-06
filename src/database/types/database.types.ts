import mongoose from "mongoose";

import type {
  ApplySchemaOptions,
  DefaultSchemaOptions,
  FilterQuery,
  ObtainDocumentType,
  ProjectionType,
  QueryOptions,
  ResolveSchemaOptions,
  SchemaDefinition,
  SchemaDefinitionType,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from "mongoose";

export const types = mongoose.SchemaTypes;

export type StatusType = 0 | 1;
export type FindType = "one" | "all";

export type DatabaseStatus = {
  error?: string;
  text: string;
  data?: any;

  type: StatusType;
};

export type Filter<T> = FilterQuery<T>;
export type Update<T> = UpdateQuery<T> | UpdateWithAggregationPipeline;
export type Projection<T> = ProjectionType<T> | null | undefined;
export type Options<T> = QueryOptions<T> | null | undefined;

export type SchemaType<
  RawDocType = any,
  TSchemaOptions = DefaultSchemaOptions,
  DocType extends ApplySchemaOptions<
    ObtainDocumentType<
      DocType,
      RawDocType,
      ResolveSchemaOptions<TSchemaOptions>
    >,
    ResolveSchemaOptions<TSchemaOptions>
  > = ApplySchemaOptions<
    ObtainDocumentType<any, RawDocType, ResolveSchemaOptions<TSchemaOptions>>,
    ResolveSchemaOptions<TSchemaOptions>
  >,
> = SchemaDefinition<SchemaDefinitionType<RawDocType>, RawDocType> | DocType;

export type UpdateOptions<T> = {
  filter: Filter<T>;
  update?: Update<T>;
};

export type FindOptions<T> = {
  filter: Filter<T>;
  projection?: Projection<T>;
  options?: Options<T>;
};
