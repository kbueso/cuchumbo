import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Regalo} from '../models';
import {RegaloRepository} from '../repositories';



@authenticate('jwt')
export class RegalosController {
  constructor(
    @repository(RegaloRepository)
    public regaloRepository: RegaloRepository,
  ) { }

  @post('/regalos')
  @response(200, {
    description: 'Regalo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Regalo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Regalo, {
            title: 'NewRegalo',
            exclude: ['id'],
          }),
        },
      },
    })
    regalo: Omit<Regalo, 'id'>,
  ): Promise<Regalo> {
    return this.regaloRepository.create(regalo);
  }

  @get('/regalos/count')
  @response(200, {
    description: 'Regalo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Regalo) where?: Where<Regalo>,
  ): Promise<Count> {
    return this.regaloRepository.count(where);
  }

  @get('/regalos')
  @response(200, {
    description: 'Array of Regalo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Regalo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Regalo) filter?: Filter<Regalo>,
  ): Promise<Regalo[]> {
    return this.regaloRepository.find(filter);
  }

  @patch('/regalos')
  @response(200, {
    description: 'Regalo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Regalo, {partial: true}),
        },
      },
    })
    regalo: Regalo,
    @param.where(Regalo) where?: Where<Regalo>,
  ): Promise<Count> {
    return this.regaloRepository.updateAll(regalo, where);
  }

  @get('/regalos/{id}')
  @response(200, {
    description: 'Regalo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Regalo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Regalo, {exclude: 'where'}) filter?: FilterExcludingWhere<Regalo>
  ): Promise<Regalo> {
    return this.regaloRepository.findById(id, filter);
  }

  @patch('/regalos/{id}')
  @response(204, {
    description: 'Regalo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Regalo, {partial: true}),
        },
      },
    })
    regalo: Regalo,
  ): Promise<void> {
    await this.regaloRepository.updateById(id, regalo);
  }

  @put('/regalos/{id}')
  @response(204, {
    description: 'Regalo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() regalo: Regalo,
  ): Promise<void> {
    await this.regaloRepository.replaceById(id, regalo);
  }

  @del('/regalos/{id}')
  @response(204, {
    description: 'Regalo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.regaloRepository.deleteById(id);
  }
}
