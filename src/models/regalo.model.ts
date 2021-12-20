import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Regalo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    default: 500,
  })
  monto?: number;

  @property({
    type: 'boolean',
    default: true,
  })
  sorpresa?: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Regalo>) {
    super(data);
  }
}

export interface RegaloRelations {
  // describe navigational properties here
}

export type RegaloWithRelations = Regalo & RegaloRelations;
