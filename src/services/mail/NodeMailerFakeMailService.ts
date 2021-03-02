import { Transporter, createTestAccount, createTransport, getTestMessageUrl } from 'nodemailer';
import { ServiceUnavaliableException } from '../../exceptions/services/ServiceUnavaliableException';
import { MailMessage, MailService } from './MailServiceInterface';

export class NodeMailerFakeMailService implements MailService {
	private client!: Transporter;

	private async createTestAccount(): Promise<Transporter> {
		const account = await createTestAccount()
		return createTransport({
			host: account.smtp.host,
			port: account.smtp.port,
			secure: account.smtp.secure,
			auth: {
				user: account.user,
				pass: account.pass,
			}
		});
	}

	public async initInstance(): Promise<void> {
		if (!this.client) {
			this.client = await this.createTestAccount();
		}
	}

	public async sendMail(mailMessage: MailMessage): Promise<void> {
		try {
			await this.initInstance();

			const sendedMailInfo = await this.client.sendMail({
				to: mailMessage.to,
				subject: mailMessage.subject,
				html: mailMessage.body,
				from: mailMessage.from,
			});

			console.log('Message send: %s', sendedMailInfo.messageId);
			console.log('Preview URL: %s', getTestMessageUrl(sendedMailInfo));
		} catch (err) {
			throw new ServiceUnavaliableException(
				'Our mail service is not available, please try later'
			);
		}
	}
}
