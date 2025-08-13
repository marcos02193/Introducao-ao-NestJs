import { Test, TestingModule } from "@nestjs/testing"
import { UserService } from "./users.service"
import { UsersController } from "./users.controller"

const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
}

describe("User Controller Testes", () => {
    let controller: UsersController

    beforeEach(async () => {
        const module: TestingModule  = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                { provide: UserService, useValue: mockUserService }
            ]
        }).compile()

        controller = module.get<UsersController>(UsersController)
    })

    // 01. teste para o metodo findAll
    it("deve listar todos os usuarios", async () => {
        const users = [
      { id: "1", name: "Jonas", email: "jonas@example.com", password: "123" },
      { id: "2", name: "Maria", email: "maria@example.com", password: "456" },
      { id: "3", name: "Jose", email: "jose@example.com", password: "789" },
    ];

    mockUserService.findAll.mockResolvedValue(users)

    expect(await controller.findAll()).toEqual(users)

    })

    // 02. teste para o metodo findOne

     it("deve encontrar um usuario especifico", async () => {
        const users = [
      { id: "1", name: "Jonas", email: "jonas@example.com", password: "123" },
      { id: "2", name: "Maria", email: "maria@example.com", password: "456" },
      { id: "3", name: "Jose", email: "jose@example.com", password: "789" },
    ];

    mockUserService.findOne.mockResolvedValue(users)

    expect(await controller.findOne(users[0].id)).toEqual(users)
    })

    // 03. teste para o metodo update

    //   [SAPINHO]
    // it("deve atualizar um usuario", async () => {
    //     const user = { id: "1", name: "Jonas", email: "jonas@example.com", password: "123" };

    //     mockUserService.update.mockResolvedValue(user)

    //     expect(await controller.updateUser(user.id, user)).toEqual(user)
    // })


    //  [CHATGPT]
//     it("deve atualizar um usuario", async () => {
//   const users = [
//     { id: "1", name: "Jonas", email: "jonas@example.com", password: "123" },
//     { id: "2", name: "Maria", email: "maria@example.com", password: "456" },
//     { id: "3", name: "Jose", email: "jose@example.com", password: "789" },
//   ];

//   const updatedUser = users[2]; // Simulando que esse é o resultado do update
//   const updateDto = {
//     name: "Jose",
//     email: "jose@example.com",
//     password: "789",
//   };

//   mockUserService.update.mockResolvedValue(updatedUser);

//   const result = await controller.updateUser(updatedUser.id, updateDto);

//   expect(result).toEqual(updatedUser);
//   expect(mockUserService.update).toHaveBeenCalledWith(updatedUser.id, updateDto);
// });


//  [AJUDA DO JONATAS]
it("deve atualizar um usuario", async () => {
     const users = { id: "2", name: "Jonas", email: "jonas@example.com", password: "123" }

  const updateusers = {...users, id: "2"}
  mockUserService.update.mockResolvedValue(users)
  const result = await controller.updateUser("2", users)
  expect(result).toEqual(updateusers)
})






// 04. teste para o metodo delete 

it("deve deletar um usuario", async () => {
     const users = [
    { id: "1", name: "Jonas", email: "jonas@example.com", password: "123" },
    { id: "2", name: "Maria", email: "maria@example.com", password: "456" },
    { id: "3", name: "Jose", email: "jose@example.com", password: "789" },
  ];

  mockUserService.remove.mockResolvedValue(users)

  expect(await controller.remove(users[2].id)).toEqual(users)

})


})