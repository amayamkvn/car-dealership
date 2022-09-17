/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, /*ParseIntPipe,*/ ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

//Los controladores leen las peticiones de los clientes y emiten una respuesta
@Controller('cars')
//@UsePipes( ValidationPipe ) //Al declarar esto decimos que todos nuestros metodos van autilizar las validaciones de pipes
export class CarsController {
  
  constructor(
    private readonly carsService: CarsService //Injection de dependencia de carService, servicio dónde se alojan los datos
  ) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll(); //Llamado al metodo findAll extraido mediante la injection de dependencias desde el servicio
  }

  // @Get(':id') //Crea un endpoint para buscar algo más luego del '/' de la url
  // getCarById( @Param('id') id ) { //El decorador @Param se utiliza para decirle a nest que queremos es leer el id que está en el decorador @Get
  //   console.log({id});
  //   return this.cars[id]; //En esta parte estamos retornando un dato del arreglo cars mediante su id
  // }

  @Get(':id') //Con el ParseIntPipe hacemos una validación para datos numericos
  getCarById( @Param('id', ParseUUIDPipe ) id: string ) { //Con el ParseUUIDPipe hacemos una validación para esperar solo uuid
    console.log({id});
    //throw new Error('Auxilio'); //Excepción que hacemos para no mostrar datos al usuario, el throw se utiliza para lanzar un error
    return this.carsService.findOneById(id); //Con el signo + antes del id hacemos la conversión de este campo string a number
  }

  //------------------------------------------------------------------------------------------------------------------------------------

  @Post()
  createCar( @Body() createCarDto: CreateCarDto ) { //Con el decorador body estamos devolviendo todo el body de la petición
    return this.carsService.create( createCarDto );
  }

  //-----------------------------------------------------------------------------------------------------------------------------------

  @Patch(':id')
  updateCar( @Param( 'id', ParseUUIDPipe ) id: string, //Este patch recibe el id y el body
             @Body() updateCarDto: UpdateCarDto ) { 

    return this.carsService.update( id, updateCarDto ); //Aquí mandamos a llamar el servicio update
  }

  //------------------------------------------------------------------------------------------------------------------------------------

  @Delete(':id')
  deleteCar( @Param('id', ParseUUIDPipe) id: string ) { 
    return this.carsService.delete( id );
  }
  
}
