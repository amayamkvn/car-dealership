/* eslint-disable prettier/prettier */

import { IsOptional, IsString, IsUUID, MinLength } from "class-validator";

//Los dto sirven para estandarizar cómo queremos que se maneje la data en nuestro sistema
//Es decir como queremos que luzca la data que enviamos al hacer post por ejemplo
export class UpdateCarDto {
    
    @IsString()
    @IsUUID()
    @IsOptional()
    readonly id?: string; //El signo de interrogación se coloca para decir que el campo es opcional

    @IsString({ message: `The brand most be a cool string` })
    @IsOptional()
    readonly brand?: string;//Se utiliza readonly para evitar que los dto sean modificados
    
    @IsString() //Decorador que me da metadata que me ayuda a verificar que la data que recibo sea la que necesito
    @MinLength(3) //Con esto definimos el minimo de caracteres
    @IsOptional()
    readonly model?: string;
}