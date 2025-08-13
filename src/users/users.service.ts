import { Injectable, NotFoundException, Post } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";


@Injectable()
export class UserService {

    constructor(private prisma: PrismaService){}

    async findAll(): Promise<User[]>{
        return this.prisma.user.findMany()
    }

    async create(data: Prisma.UserCreateInput):Promise<User>{
        return this.prisma.user.create({ data })
    }

    async findOne(id: string): Promise<User | null> {
        const foundUser = await  this.prisma.user.findUnique({where: {id}})

        if(!foundUser){
            throw new NotFoundException(`usuario com id ${id} não encontrado`)
        }
        return foundUser
    }

    async update(id: string, data: Prisma.UserUpdateInput): Promise<User | null> {
    const updateUser = this.prisma.user.update({where: {id}, data})

    if(!updateUser){
            throw new NotFoundException(`usuario com id ${id} não atualizado`)
        }
        return updateUser    
  }

  async remove(id: string):  Promise<User | null>{
    const removedUser = this.prisma.user.delete({where: {id}})

    if(!removedUser){
            throw new NotFoundException(`usuario com id ${id} não apagado`)
        }
        return removedUser
  }
}
 