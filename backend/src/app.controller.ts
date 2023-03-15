import { SuccessResponse } from '@common/response/success.response';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('App Controller')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({
    type: SuccessResponse<String>,
    description: 'Hello world route.',
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
