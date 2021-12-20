import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Regalo, RegaloRelations} from '../models';

export class RegaloRepository extends DefaultCrudRepository<
  Regalo,
  typeof Regalo.prototype.id,
  RegaloRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Regalo, dataSource);
  }
}
