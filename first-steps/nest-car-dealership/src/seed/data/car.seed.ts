import { Car } from 'src/cars/interfaces/car.interface';
import { v4 as uuid } from 'uuid';

export const CARS_SEED: Car[] = [
  {
    id: uuid(),
    brand: 'Toyota',
    model: 'Corolla',
    sku: 1,
  },
  {
    id: uuid(),
    brand: 'Honda',
    model: 'Civic',
    sku: 2,
  },
  {
    id: uuid(),
    brand: 'Jeep',
    model: 'Cherokee',
    sku: 3,
  },
];
