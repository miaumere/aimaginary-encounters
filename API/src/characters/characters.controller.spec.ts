import { Test } from '@nestjs/testing';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';

describe('CharactersController', () => {
	let controller: CharactersController;
	let service: CharactersService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			controllers: [CharactersController],
			providers: [
				{
					provide: CharactersService,
					useValue: {
						getCharacterList: jest.fn().mockImplementation(() =>
							Promise.resolve([
								{
									id: 'e7c629ee-830d-45e2-a237-9ebcc04d181b',
									name: 'Test',
									image: 'test.jpg',
								},
								{
									id: 'e7c629ee-830d-45e2-a237-9ebcc04d181c',
									name: 'Test2',
									image: 'test2.jpg',
								},
								{
									id: 'e7c629ee-830d-45e2-a237-9ebcc04d181d',
									name: 'Test3',
									image: 'test3.jpg',
								},
							])
						),
					},
				},
			],
		}).compile();

		controller = module.get<CharactersController>(CharactersController);
		service = module.get<CharactersService>(CharactersService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('getCharacterList', () => {
		it('should return a list of characters', async () => {
			await expect(controller.getCharacterList()).resolves.toEqual([
				{
					id: 'e7c629ee-830d-45e2-a237-9ebcc04d181b',
					name: 'Test',
					image: 'test.jpg',
				},
				{
					id: 'e7c629ee-830d-45e2-a237-9ebcc04d181c',
					name: 'Test2',
					image: 'test2.jpg',
				},
				{
					id: 'e7c629ee-830d-45e2-a237-9ebcc04d181d',
					name: 'Test3',
					image: 'test3.jpg',
				},
			]);
		});
	});
});
