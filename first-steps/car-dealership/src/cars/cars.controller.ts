import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get('sku/:sku')
  getCarsBySku(@Param('sku', ParseIntPipe) sku: number) {
    return this.carsService.findOneBySku(sku);
  }

  @Get(':id')
  getCarsById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.carsService.findOneById(id);
  }

  /**
   * ✅ Recommended: uses modern object merging via spread operator
   */
  @Post()
  createCar(@Body() createCarDto: CreateCarDto) {
    return this.carsService.createCarV2(createCarDto);
  }

  /**
   * ⚠️ Deprecated: manually assigns fields (less flexible)
   */
  @Post('v1')
  createCarDeprecated(@Body() createCarDto: CreateCarDto) {
    return this.carsService.createCarV1(createCarDto);
  }

  @Patch(':id')
  updateCar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    this.carsService.delete(id);
    return { message: `Car with id ${id} deleted` };
  }
}
