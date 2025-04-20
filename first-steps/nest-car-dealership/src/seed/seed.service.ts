import { Injectable } from '@nestjs/common';
import { CARS_SEED } from './data/car.seed';
import { CarsService } from '../cars/cars.service';
import { BrandsService } from '../brands/brands.service';
import { BRAND_SEED } from './data/brand.seed';

@Injectable()
export class SeedService {
  constructor(
    private readonly CarsService: CarsService, // Injecting CarsService to use its methods
    private readonly BrandsService: BrandsService, // Injecting BrandService to use its methods
  ) {}
  populateDB() {
    this.CarsService.fillWithSeedData(CARS_SEED);
    this.BrandsService.fillWithSeedData(BRAND_SEED);
    return 'Seed executed';
  }
}
