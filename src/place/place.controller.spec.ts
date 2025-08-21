import { Test, TestingModule } from "@nestjs/testing";
import { PlaceController } from "./place.controller";
import { PlaceService } from "./place.service";
import { CloudinaryService } from "./cloudinary.service";
import { Place, placeType } from "@prisma/client";
import { buffer } from "stream/consumers";
import { BadRequestException } from "@nestjs/common";



describe('PlaceController testes', () => {
  let controller: PlaceController;
  let placeService: jest.Mocked<PlaceService>;
  let cloudinaryService: jest.Mocked<CloudinaryService>;

  beforeEach(async () => {
    const mockPlaceService = {
      findAll: jest.fn(),
      findPaginated: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    const mockCloudinaryService = {
      uploadImage: jest.fn(),
      deleteImage: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaceController],
      providers: [
        { provide: PlaceService, useValue: mockPlaceService },
        { provide: CloudinaryService, useValue: mockCloudinaryService },
      ],
    }).compile();

    controller = module.get<PlaceController>(PlaceController);
    placeService = module.get(PlaceService);
    cloudinaryService = module.get(CloudinaryService);
  });

    // "Deve listar todos os locais"
  it("deve lista todos os places", async () => {

    // se quero que seja igual ao prisma e aponte o erro [const places: Place[]] e dps importar o PLACE do prisma
    const places = [
      { id: "1", name: "Praia", type: placeType.RESTAURANTE, phone: "123456789", latitude: -3.7327, longitude: -38.5267, images: [], created_at: new Date() },
      { id: "1", name: "Praia", type: placeType.HOTEL, phone: "123456789", latitude: -2.2222, longitude: -23.5267, images: [], created_at: new Date() },
      { id: "1", name: "Praia", type: placeType.HOTEL, phone: "123456789", latitude: -5.5555, longitude: -55.5267, images: [], created_at: new Date() },
    ]

    placeService.findAll.mockResolvedValue(places)

    expect(await controller.findAll()).toEqual(places)

  })

  it("deve fazer a paginação", async () => {
  const limit = 10;
  const page = 1;

  const result = {
    data: [
      {
        id: "1",
        name: "Praia",
        type: placeType.RESTAURANTE,
        phone: "123456789",
        latitude: -3.7327,
        longitude: -38.5267,
        images: [],
        created_at: new Date(),
      },
      {
        id: "2",
        name: "Praia",
        type: placeType.HOTEL,
        phone: "123456789",
        latitude: -2.2222,
        longitude: -23.5267,
        images: [],
        created_at: new Date(),
      },
      {
        id: "3",
        name: "Praia",
        type: placeType.HOTEL,
        phone: "123456789",
        latitude: -5.5555,
        longitude: -55.5267,
        images: [],
        created_at: new Date(),
      },
    ],
    meta: {
      total: 3,
      page: 1,
      lastPage: 1,
    },
  };

  placeService.findPaginated.mockResolvedValue(result);

  expect(await controller.findpaginated(page, limit)).toEqual(result);
  expect(placeService.findPaginated).toHaveBeenCalledWith(page, limit);
});


    // 03. deve criar

    it("deve criar um local com imagem", async () => {
        const dto = {
        name: "Praia",
        type: placeType.HOTEL,
        phone: "123456789",
        latitude: -5.5555,
        longitude: -55.5267,
        }

        const files = {images: [
            {buffer: Buffer.from("img")}
        ]} as any 
        

        cloudinaryService.uploadImage.mockResolvedValue({url: "https", public_id: "id_from_clodinary"})

        placeService.create.mockResolvedValue({
        id: "1",
        images: [{url: "https", public_id: "id_from_clodinary"}],
        created_at: new Date(),
        ...dto
        })

        const result = await controller.createPlace(dto as any, files)

        expect(cloudinaryService.uploadImage).toHaveBeenCalled()
        expect(placeService.create).toHaveBeenCalled()
        expect(result.id).toBe("1")

    })

    // deve lança um erro ao criar sem imagem
    // dica .reject.toThrow()


    it("deve lançar erro ao criar place sem images", async () => {
        const dto = {
             name: "Praia",
        type: placeType.HOTEL,
        phone: "123456789",
        latitude: -5.5555,
        longitude: -55.5267,
        }

        const files = {images: []} as any 

        await expect( controller.createPlace(dto, files))
        .rejects.toThrow(BadRequestException)
    })

//    [GITHUB DO PROFESSOR JONAS FONTES]
//     it('deve lançar erro ao criar sem imagens', async () => {
//     await expect(
//       controller.createPlace({} as any, { images: [] } as any),
//     ).rejects.toThrow(BadRequestException);
//   });


// 04. deve atualizar
it("deve atualizar um usuario", async () => {
  const placeUpdated = {
    id: "2",
    name: "Praia",
    type: placeType.RESTAURANTE,
    phone: "123456789",
    latitude: -3.7327,
    longitude: -38.5267,
    images: [],
    created_at: new Date(),
  };

  const updateDto = {
    name: "Praia",
    type: placeType.RESTAURANTE,
    phone: "123456789",
    latitude: -3.7327,
    longitude: -38.5267,
  };

  placeService.update.mockResolvedValue(placeUpdated);

  const result = await controller.updatePlace("2", updateDto, { images: [] });

  expect(result).toEqual(placeUpdated);
  expect(placeService.update).toHaveBeenCalledWith("2", updateDto, []);
});



// 05. deve deletar
it('deve excluir um local específico', async () => {
        const places: Place[] = [
            { id: '1', name: 'Hotel Genérico', type: placeType.HOTEL, phone: '(88) 99999-9999', latitude: -3.7327, longitude: 38.5267, images: [], created_at: new Date() },
            { id: '2', name: 'Restaurante Genérico', type: placeType.RESTAURANTE, phone: '(88) 99999-9999', latitude: -3.7327, longitude: 38.5267, images: [], created_at: new Date() },
            { id: '3', name: 'Bar Genérico', type: placeType.BAR, phone: '(88) 99999-9999', latitude: -3.7327, longitude: 38.5267, images: [], created_at: new Date() },
        ]

        placeService.delete.mockResolvedValue()
        await controller.deletePlace(places[2].id)
        expect(placeService.delete).toHaveBeenCalledWith(places[2].id)
    })




})