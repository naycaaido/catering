import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [AddressController],
  providers: [AddressService],
  imports: [DatabaseModule],
})
export class AddressModule {}
