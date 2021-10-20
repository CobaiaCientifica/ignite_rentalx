import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1.5, "day").toDate();
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carsRepositoryInMemory
        );
    });
    it("should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Car test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: " 1234",
            brand: "brand",
        });
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });
        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });
    it("should not be able to create a new rental if there is another open rental for that user", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Car test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: " 1234",
            brand: "brand",
        });
        const car2 = await carsRepositoryInMemory.create({
            name: "Test2",
            description: "Car test 2",
            daily_rate: 100,
            license_plate: "test 2",
            fine_amount: 40,
            category_id: " 1234",
            brand: "brand 2",
        });
        await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });
        await expect(
            createRentalUseCase.execute({
                user_id: "12345",
                car_id: car2.id,
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(
            new AppError("There's a rental in progress for user")
        );
    });
    it("should not be able to create a new rental if there is another open rental for the same car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Car test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: " 1234",
            brand: "brand",
        });
        await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });
        await expect(
            createRentalUseCase.execute({
                user_id: "12367",
                car_id: car.id,
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(new AppError("Car is unavailable"));
    });
    it("should not be able to create a new rental with invalid return time", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Car test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: " 1234",
            brand: "brand",
        });
        await expect(
            createRentalUseCase.execute({
                user_id: "12367",
                car_id: car.id,
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(new AppError("Invalid return time"));
    });
});
