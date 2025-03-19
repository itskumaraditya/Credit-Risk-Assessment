import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, SystemMessage } from "langchain/schema";

export class CreditRiskAnalyzer {
  private model: ChatOpenAI;

  constructor(apiKey: string) {
    this.model = new ChatOpenAI({
      openAIApiKey: apiKey,
      modelName: "gpt-4",
      temperature: 0.2,
    });
  }

  async analyzeWalletActivity(walletData: any) {
    const systemPrompt = new SystemMessage(
      "You are a crypto credit risk analyst. Analyze wallet activity and provide a risk assessment."
    );

    const userPrompt = new HumanMessage(
      `Analyze the following wallet activity data and provide a risk assessment:
      ${JSON.stringify(walletData, null, 2)}`
    );

    const response = await this.model.call([systemPrompt, userPrompt]);
    return this.parseAnalysis(response.content);
  }

  async calculateCreditScore(analysisResults: any) {
    const baseScore = 650;
    let scoreAdjustment = 0;

    // Analyze wallet age
    scoreAdjustment += analysisResults.walletAge * 2;

    // Analyze transaction history
    scoreAdjustment += analysisResults.transactionVolume * 0.5;

    // Consider protocol diversity
    scoreAdjustment += analysisResults.protocolDiversity * 10;

    // Assess risk factors
    scoreAdjustment -= analysisResults.riskFactors * 15;

    const finalScore = Math.max(300, Math.min(850, baseScore + scoreAdjustment));
    return Math.round(finalScore);
  }

  private parseAnalysis(content: string): any {
    try {
      return JSON.parse(content);
    } catch (error) {
      console.error("Failed to parse analysis:", error);
      return {
        walletAge: 0,
        transactionVolume: 0,
        protocolDiversity: 0,
        riskFactors: 0,
      };
    }
  }
}