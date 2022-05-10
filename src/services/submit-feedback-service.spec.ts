import { SubmitFeedbackService } from "./subtmit-feedback-service";

// fn é uma função espiã, sem funcionalidade, porém é possível saber quando é invocada
const createFeedbackSpy = jest.fn();
const sendMailspy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
	// A tipagem pede pra passar uma classe ou interface que possui apenas um método
	// Dessa forma é passado um objeto com um método que não faz nada
	// Um null mais elegante
	// { create: async () => {} },
	// { sendMail: async () => {} }
    { create: createFeedbackSpy },
	{ sendMail: sendMailspy }
);

describe("", () => {
	it("should be able to submit a feedback", async () => {
		await expect(
			submitFeedback.execute({
				type: "BUG",
				comment: "Example comment",
				screenshot: "data:image/png;base64,dsiaodwioadwna",
			})
		).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailspy).toHaveBeenCalled()
	});

	it("should not be able to submit a feedback without a type", async () => {
		await expect(
			submitFeedback.execute({
				type: "",
				comment: "Example comment",
				screenshot: "data:image/png;base64,dsiaodwioadwna",
			})
		).rejects.toThrow();
	});

	it("should not be able to submit a feedback without a comment", async () => {
		await expect(
			submitFeedback.execute({
				type: "BUG",
				comment: "",
				screenshot: "data:image/png;base64,dsiaodwioadwna",
			})
		).rejects.toThrow();
	});

	it("should not be able to submit a feedback with an invalid screenshot ", async () => {
		await expect(
			submitFeedback.execute({
				type: "BUG",
				comment: "Everything is a bug",
				screenshot: "data:image/png;test.jpg,dsiaodwioadwna",
			})
		).rejects.toThrow();
	});
});
