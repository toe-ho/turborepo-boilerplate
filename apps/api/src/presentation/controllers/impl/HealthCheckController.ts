import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/decorator/PublicDecorator';

@ApiTags('Health')
@Controller('health')
export class HealthCheckController {
  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @Public()
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  healthCheck(): { status: string; timestamp: string } {
    return {
      status: 'UP',
      timestamp: new Date().toISOString(),
    };
  }
}
