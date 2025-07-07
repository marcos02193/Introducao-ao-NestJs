import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class createUserDto {
    @ApiProperty({
        example: `jonas fontes`,
        description: `nome completo do usuario`
    })
    @IsNotEmpty({message: "nome obrigatorio"})
    name: string

    @ApiProperty({
        example: `jonasfonte@gmail.com`,
        description: `email do usuario`
    })
    @IsEmail({}, {message: "o email deve ser um endereço valido"})
    email: string


}

