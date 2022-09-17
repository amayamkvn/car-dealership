/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';


//Un servicio es un provider que contiene una clase que puede ser injectable a otros modulos
@Injectable()
export class CarsService {

 private cars: Car[] = [ //En esta parte Car es la interface que nos obliga a tener el id, brand y model dentro del arreglo
    // {
    //     id: uuid(),
    //     brand: 'Honda',
    //     model: 'Civic'
    // }
 ];

 // GET 
 findAll() {
    return this.cars;
 }

 findOneById( id: string ) {
    const car = this.cars.find( car => car.id === id); // con la función find vamos a bucar e car cuyo car.id sea exactamente igual al id que estoy recibiendo
    //Cuando el if es de una sóla línea se pueden obviar las llaves
    if (!car) { //Validación para saber si el car existe o no existe
        throw new NotFoundException(`Car wirh id '${id}' not found`); //Aquí mandamos el error en caso de que el car no exista
    }

    return car;
 }
   
 // POST
 create( createCarDto: CreateCarDto ) {
    const car: Car = {
        id: uuid(),
        ...createCarDto //De esta forma pasamos los datos que ya tenemos en el createCarDto los cuales son brand y model
        //brand: createCarDto.brand,
        //model: createCarDto.model
    }

    this.cars.push( car ); //En esta línea introducimos el arreglo antes creado
    return car;
 }
//  create( {model, brand}: CreateCarDto ) {  Este metodo realiza lo mismo que la anterior pero con desestructuración de datos
//     const car: Car = {
//         id: uuid(),
//         brand,
//         model
//     }
//     return car;
//  }


// PATCH
update( id: string, updateCarDto: UpdateCarDto ) {

    let carDB = this.findOneById( id ); //reutilizamos el metodo de buscar para verificar que el id esté almacenado

    if( updateCarDto.id && updateCarDto.id !== id ) //Validación para verificar que si el usuario manda el id en el body, este sea igual que al de la url
        throw new BadRequestException( `Car id is not valid inside body` );

    this.cars = this.cars.map( car => {

        if ( car.id === id ){ //Validación para actualizar el elemento con exactamente el id que estamos enviado
            carDB = {
                ...carDB,
                ...updateCarDto, //Exparsir las propiedades dentro de estos arreglos
                id, //En caso de encontrar el id sobreescribe los campos anteriores
            }
            return carDB;
        }
        return car;
    })
    return carDB; //retornamos el carro actualizado
}

 //DELETE
 delete( id: string ){

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const car = this.findOneById( id ); 
    this.cars = this.cars.filter( car => car.id !== id );

 }

 fillCarsWithSeedData( cars: Car[]) {
    this.cars = cars;
 }

}
