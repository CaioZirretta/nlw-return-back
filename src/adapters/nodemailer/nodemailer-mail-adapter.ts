import { MailAdapter, SendMailData } from "./../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
	host: "smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "18fbb2dc225784",
		pass: "379ebae9b30b22",
	},
});

export class NodemailerMailAdapter implements MailAdapter {
	async sendMail({ subject, body }: SendMailData) {
		await transport.sendMail({
			from: "Equipe Feedget <oi@feedget.com>",
			to: "Caio Vinícius <caiozirretta@hotmail.com>",
			subject,
			html: body,
		});
	}
}
