import { container } from "tsyringe";

import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";

container.registerInstance<IMailProvider>(
    "MailProvider",
    new EtherealMailProvider()
);
const mailProvider = {
    ethereal: container.resolve(EtherealMailProvider),
    ses: container.resolve(SESMailProvider),
};
container.registerSingleton<IMailProvider>(
    "MailProvider",
    mailProvider[process.env.MAIL_PROVIDER]
);
