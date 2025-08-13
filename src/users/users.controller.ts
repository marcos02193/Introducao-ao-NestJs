import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { createUserDto } from "./DTO/create-user.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UpdateUserDto } from "./DTO/update-user.dto";
import { JwtAuthGuard } from "../auth/jwt.guard";

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller("user")
export class UsersController {


    private UserService: UserService

    constructor(UserService: UserService ){
        this.UserService = UserService
    }

    // @Post()
    // @ApiOperation({summary: 'criar um novo usuario'})
    // @ApiBody({type: createUserDto})
    // @ApiResponse({status:201, description: `usuario criado com sucesso!`})
    // create(@Body() data:  createUserDto){
    //     return this.UserService.create(data);
    // }

    @Get()
    @ApiOperation({summary: 'econtrar todos os usuarios'})
    @ApiBody({type: createUserDto})
    @ApiResponse({status:201, description: `usuarios encotrados com sucesso!`})
    findAll(){
        return this.UserService.findAll()
    }

    @Get(':id')
    @ApiOperation({summary: 'encotrar um usuario'})
    @ApiBody({type: createUserDto})
    @ApiResponse({status:201, description: `usuario econtrado com sucesso!`})
    findOne(@Param('id') id: string){
        return this.UserService.findOne(id)
    }

    @Put(':id')
    @ApiOperation({summary: 'atualizar um usuario'})
    @ApiBody({type: UpdateUserDto})
    @ApiResponse({status:201, description: `usuario atualizado com sucesso!`})
    async updateUser(@Param('id') id: string, @Body() data:UpdateUserDto){
        return this.UserService.update(id, data)
    }

    @Delete(':id')
    @ApiOperation({summary: 'deletar um usuario'})
    @ApiBody({type: createUserDto})
    @ApiResponse({status:201, description: `usuario deletado com sucesso!`})
    async remove(@Param('id') id: string){
        return this.UserService.remove(id)
    } 





}

