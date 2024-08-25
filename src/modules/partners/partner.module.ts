import { Module } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { PartnerWintelController } from './partner-wintel.controller';
import { PartnerWintelService } from './partner-wintel.service';

@Module({
  imports: [],
  controllers: [PartnerWintelController],
  providers: [PartnerWintelService, AuthService],
  exports: [PartnerWintelService],
})
export class PartnerModule {}
