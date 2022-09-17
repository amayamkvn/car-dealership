import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CarsModule } from '../cars/cars.module';
import { BrandsModule } from '../brands/brands.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [CarsModule, BrandsModule] //Modulo importado para poder acceder a él
})
export class SeedModule {}
