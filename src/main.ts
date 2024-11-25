import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from './logger/logger';
import { LoggingInterceptor } from './intercaptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new CustomLogger(configService);
  const port = ConfigService.get('port');

  app.useLogger(logger);
  app.useGlobalInterceptors(new LoggingInterceptor());

  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception', error.stack);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason: any) => {
    logger.error('Unhandled Rejection', reason?.stack);
  });

  await app.listen(port || 4000);
}
bootstrap();
