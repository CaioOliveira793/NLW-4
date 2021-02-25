import { Module } from '@nestjs/common';
import { DatabaseProvider } from '../database/DatabaseProvider';

@Module({
  providers: [DatabaseProvider],
  exports: [DatabaseProvider],
})
export class DatabaseModule {}
