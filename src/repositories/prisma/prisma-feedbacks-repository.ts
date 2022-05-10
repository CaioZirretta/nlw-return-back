import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbacksRepository } from "./../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
	async create({ type, comment, screenshot }: FeedbackCreateData) {
		await prisma.feedback.create({
			// Como a chave tem o mesmo nome do valor, não é preciso explicitar
			data: {
				type,
				comment,
				screenshot,
			},
		});
	}
}
