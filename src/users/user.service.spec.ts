import { Test, TestingModule } from "@nestjs/testing"
import { UserService } from "./users.service"
import { PrismaService } from "../prisma/prisma.service"
import {NotFoundException} from "@nestjs/common"


const mockPrisma = {
    user: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}

// Testes para o UsersService
// Aqui estamos criando uma suite de testes para o UsersService, que é responsável por gerenciar usuários
// Usamos o Jest para criar mocks e verificar se as funções estão sendo chamadas corretamente
describe("UsersService", () => {
  let service: UserService;

  // Antes de cada teste, criamos uma instância do UsersService com o PrismaService mockado
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  // Testes individuais
  // Aqui definimos os testes individuais para cada funcionalidade do UsersService
  // 01. Teste para o método create
  it("deve criar um usuário", async () => {
    const dto = { name: "Jonas", email: "jonas@example.com", password: "123" };
    mockPrisma.user.create.mockResolvedValue(dto);

    const result = await service.create(dto as any);
    expect(result).toEqual(dto);
    expect(mockPrisma.user.create).toHaveBeenCalledWith({ data: dto });
  });

  // 02. Teste para o método findAll

  it("deve listar todos os usuários", async () => {
    const dto = [
      { id: "1", name: "Jonas", email: "jonas@example.com", password: "123" },
      { id: "2", name: "Maria", email: "maria@example.com", password: "456" },
      { id: "3", name: "Jose", email: "jose@example.com", password: "789" },
    ];
    mockPrisma.user.findMany.mockResolvedValue(dto);

    const result = await service.findAll();
    expect(result).toEqual(dto);
  });

  //  it("deve listar todos os usuários", async () => {
  //   mockPrisma.user.findMany.mockResolvedValue([]);
  //   const result = await service.findall();
  //   expect(result).toEqual([]);
  //   expect(mockPrisma.user.findMany).toHaveBeenCalled();
  // });


// 03. Teste para o método findone

it("Mostrar usuario por ID", async () =>{
   const dto = [
      { id: "1", name: "Jonas", email: "jonas@example.com", password: "123" },
      { id: "2", name: "Maria", email: "maria@example.com", password: "456" },
      { id: "3", name: "Jose", email: "jose@example.com", password: "789" },
    ];
    mockPrisma.user.findUnique.mockResolvedValue(dto)

    const result = await service.findOne("1")
    expect(result).toEqual(dto)
     expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({where: {id: "1"}});
    })


    
    // 04
  
    it("deve atualizar o usuario", async () => {
       const dto = [
      { id: "2", name: "Maria", email: "maria@example.com", password: "456" }
    ];
    mockPrisma.user.findUnique.mockResolvedValue(dto)
    mockPrisma.user.update.mockResolvedValue(dto)

    const result = await service.update("2", {name: "Maria", email: "maria@example.com", password: "456" }as any)
    expect(result).toEqual(dto)
    expect(mockPrisma.user.update).toHaveBeenCalledWith({
      where: {id: "2"},
      data: {
        name: "Maria",
        email: "maria@example.com",
        password: "456" }
    });
  })


   // 05.

   

 it("Deve deletar um usuario", async () => {
      const dto = { id: "2", name: "Maria", email: "maria@example.com", password: "456" }

      mockPrisma.user.findUnique.mockResolvedValue(dto)
      mockPrisma.user.delete.mockResolvedValue(dto)

      const result = await service.remove(dto.id)
      expect(result).toEqual(dto)
      expect(mockPrisma.user.delete).toHaveBeenCalledWith({
      where: {id: "2"}
    });
    })









})

// Executar os  testes: npm test

