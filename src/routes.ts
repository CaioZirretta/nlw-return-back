import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { SubmitFeedbackService } from "./services/subtmit-feedback-service";
import express from "express";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
	// desestruturação pra melhorar a sintaxe
	const { type, comment, screenshot } = req.body;

	const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
	const nodemailerMailAdapter = new NodemailerMailAdapter();

	const submitFeedbackService = new SubmitFeedbackService(
		prismaFeedbacksRepository,
		nodemailerMailAdapter
	);

	await submitFeedbackService.execute({
		type,
		comment,
		screenshot,
	});

	return res.status(201).send();
});
