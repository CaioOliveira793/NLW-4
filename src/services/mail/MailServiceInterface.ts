export interface MailAddress {
	name: string;
	address: string;
}

export interface MailMessage {
	to: MailAddress;
	from: MailAddress;
	subject: string;
	body: string;
}

export interface MailService {
	sendMail(mailMessage: MailMessage): Promise<void>;
}
