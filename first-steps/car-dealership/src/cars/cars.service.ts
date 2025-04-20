import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv } from 'uuid';

import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    { id: uuidv(), sku: 1, brand: 'Toyota', model: 'Corolla' },
    { id: uuidv(), sku: 2, brand: 'Honda', model: 'Civic' },
    { id: uuidv(), sku: 3, brand: 'Jeep', model: 'Cherokee' },
  ];

  findAll() {
    return this.cars;
  }

  findOneBySku(sku: number) {
    const car = this.cars.find((car) => car.sku === sku);
    if (!car) throw new NotFoundException(`Car with sku ${sku} not found`);
    return car;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    return car;
  }

  /**
   * ✅ Recommended method: uses spread operator to build the car object dynamically.
   */
  createCarV2(createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuidv(),
      ...createCarDto,
    };

    this.cars.push(car);
    return car;
  }

  /**
   * ⚠️ Deprecated method: manually extracts fields, not scalable.
   * @deprecated Use createCarV2 instead.
   */
  createCarV1(createCarDto: CreateCarDto) {
    const { brand, model, sku } = createCarDto;

    const car: Car = {
      id: uuidv(),
      brand,
      model,
      sku,
    };

    this.cars.push(car);
    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findOneById(id);

    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException(`Car id is not valid inside body`);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        /**
         * 🧠 Golden Rule of the Spread Operator:
         * Later values overwrite earlier ones.
         */
        carDB = { ...carDB, ...updateCarDto, id };
        return carDB;
      }

      return car;
    });

    return carDB;
  }

  delete(id: string) {
    this.findOneById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
  }
}
