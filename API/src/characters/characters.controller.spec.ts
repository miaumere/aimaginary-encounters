import { Test } from '@nestjs/testing';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';

const exampleCharacter = {
	id: 'e7c629ee-830d-45e2-a237-9ebcc04d181b',
	name: 'Test',
	image: 'test.jpg',
	age: '30',
	gender: 'male',
	backstory: 'Example backstory',
	skills: 'test',
	positiveTraits: 'test',
	negativeTraits: 'test',
	color: 'red',
};

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
						deleteCharacter: jest
							.fn()
							.mockImplementation(() => Promise.resolve()),
						getCharacter: jest
							.fn()
							.mockImplementation(() =>
								Promise.resolve(exampleCharacter)
							),
						upsertCharacter: jest
							.fn()
							.mockImplementation(() => Promise.resolve()),
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

	describe('remove', () => {
		it('should delete a character', async () => {
			await expect(
				controller.remove('e7c629ee-830d-45e2-a237-9ebcc04d181b')
			).resolves.toEqual(undefined);
		});
	});

	describe('getCharacter', () => {
		it('should return a character', async () => {
			await expect(
				controller.getCharacter(exampleCharacter.id)
			).resolves.toEqual(exampleCharacter);
		});
	});
});
