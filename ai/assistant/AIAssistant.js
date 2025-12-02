import { buildPrompt } from './promptBuilder';
import { generateText } from '@/ai/text/generateText';

export const runAIAssistantCommand = async (task, context) => {
    const prompt = buildPrompt(task, context);
    const response = await generateText(prompt);

    return response;
};
