import { Module, Scope } from '@nestjs/common';
import { AppService } from './app.service';
import { AppConfig } from './config';
import { AppConfigModule } from './config/app-config.module';
import { LoggerFactoryModule } from './shared/logger/logger-factory.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './shared/exception/http-exception';
import { PartnerModule } from './modules/partners/partner.module';

@Module({
  imports: [
    AppConfigModule,
    LoggerFactoryModule.forRootAsync({
      useFactory: () => AppConfig.load().log,
    }),

    PartnerModule,
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      scope: Scope.REQUEST,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
