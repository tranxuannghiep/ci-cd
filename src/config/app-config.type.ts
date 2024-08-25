import { Exclude, Expose, Type } from 'class-transformer';
import { IsDefined, IsInt, IsString, ValidateNested } from 'class-validator';
import { LoggerServiceOption } from 'src/shared/logger/logger.config';
import { readAndValidateEnv } from './config.loader';

export class ServerOption {
  @IsInt()
  @IsDefined()
  @Expose()
  httpPort: number;

  @IsString()
  @IsDefined()
  @Expose()
  swaggerPath: string;
}

@Exclude()
export class AppConfig {
  private static storedConfig: AppConfig;

  @Expose()
  @ValidateNested()
  @Type(() => ServerOption)
  @IsDefined()
  server: ServerOption;

  @Expose()
  @ValidateNested()
  @Type(() => LoggerServiceOption)
  @IsDefined()
  log: LoggerServiceOption;

  static load(): AppConfig {
    if (AppConfig.storedConfig) return AppConfig.storedConfig;

    let configFiles = ['config.yaml'];
    if (process.env.CONFIG_FILE) {
      configFiles = [process.env.CONFIG_FILE];
    }

    AppConfig.storedConfig = readAndValidateEnv(AppConfig, ...configFiles);
    return AppConfig.storedConfig;
  }
}
