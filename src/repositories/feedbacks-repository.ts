export interface FeedbackCreateData{
    type: string;
    comment: string;
    screenshot?: string;
}

// Contrato, quais operações podem ser feitas no db
export interface FeedbacksRepository {
    // método, se vai executar algo (e tipo) e retorno (e tipo)
    // Toda função async retorna uma promise
    create : (data: FeedbackCreateData) => Promise<void>;
}