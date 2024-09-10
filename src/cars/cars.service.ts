import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ];

  public getAllCars() {
    return this.cars;
  }

  public getCarById(id: string) {
    const carFound = this.cars.find((car) => car.id === id);

    if (!carFound) {
      throw new NotFoundException(`Car with id ${id} nor found`);
    }
    return carFound;
  }

  public create(createCarDto: CreateCarDto) {
    const newCar: Car = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(newCar);
    return newCar;
  }

  public update(id: string, updateCardto: UpdateCarDto) {
    let carDb = this.getCarById(id);

    if (carDb.id && carDb.id !== id) {
      throw new BadRequestException(`El id enviado no es valido`);
    }

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDb = {
          ...carDb,
          ...updateCardto,
          id,
        };
        return carDb;
      }
      return car;
    });
    return carDb;
  }
  delete(id: string) {
    const carDb = this.getCarById(id);

    this.cars = this.cars.filter((car) => car.id !== carDb.id);
  }
}
