import { MailAdapter } from "./../adapters/mail-adapter";
import { FeedbacksRepository } from "./../repositories/feedbacks-repository";

export interface SubmitFeedbackUseServiceRequest {
	type: string;
	comment: string;
	screenshot?: string;
}

export class SubmitFeedbackService {
	/* 
    Ao receber um repositório com parâmetro, o prisma é desacoplado do service
    Para mudar de ORM, bastaria criar outro repositório.
    Veja que não tem referência nenhuma ao prisma. Injeção reversa de dependência.
   
    private feedbacksRepository: FeedbacksRepository;
	
    constructor(feedbacksRepository: FeedbacksRepository) {
	    this.feedbacksRepository = feedbacksRepository;
	}
    
    Equivale a: 
    */

	constructor(private feedbacksRepository: FeedbacksRepository, private mailAdapter: MailAdapter) {}

	async execute(request: SubmitFeedbackUseServiceRequest) {
		const { type, comment, screenshot } = request;

		if (!type) {
			throw new Error("Type is required");
		}

		if (!comment) {
			throw new Error("Comment is required");
		}

		if (screenshot && !screenshot.startsWith("data:image/png;base64"))
			throw new Error("Invalid screenshot format");

		await this.feedbacksRepository.create({
			type,
			comment,
			screenshot,
		});

		await this.mailAdapter.sendMail({
			subject: "Novo Feedback",
			body: [
				`<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
				`<p>Tipo do feedback: ${type}</p>`,
				`<p>Tipo do comentário: ${comment}</p>`,
				`<div>`,
			].join(""),
		});
	}
}
