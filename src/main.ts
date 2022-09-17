/* eslint-disable prettier/prettier */

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

//main es la función que se va ejecutar al inicio de las ejecuciones
async function main() {
  const app = await NestFactory.create(AppModule); //Crea la app de nest mandandole el modulo principal
  
  app.useGlobalPipes( 
    new ValidationPipe({
    whitelist: true, //Remueve la data que no necesitamos de la data enviada
    forbidNonWhitelisted: true, //Devuelve un error si recibimos data que no esperamos
    })
   );
  
  await app.listen(3000); //Espera al puerto dónde se llevará a cabo la ejecución
}
main();
