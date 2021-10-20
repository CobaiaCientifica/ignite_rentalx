import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });
    it("should be able to send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");
        await usersRepositoryInMemory.create({
            driver_license: "111111",
            email: "test@test.com",
            name: "Test User 1",
            password: "test",
        });
        await sendForgotPasswordMailUseCase.execute("test@test.com");
        expect(sendMail).toHaveBeenCalled();
    });
    it("should not be able to send a forgot password mail to a non existent user", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("test@test.com")
        ).rejects.toEqual(new AppError("User does not exists"));
    });
    it("should be able to create a token for a user", async () => {
        const generateToken = jest.spyOn(
            usersTokensRepositoryInMemory,
            "create"
        );
        await usersRepositoryInMemory.create({
            driver_license: "111111",
            email: "test@test.com",
            name: "Test User 1",
            password: "test",
        });
        await sendForgotPasswordMailUseCase.execute("test@test.com");
        expect(generateToken).toBeCalled();
    });
});
