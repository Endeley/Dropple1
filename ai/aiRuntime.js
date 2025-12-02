import { aiUnderstand } from './aiNLP';
import * as actions from './actions';

const RESULT_MESSAGES = {
    alignment: 'Alignment applied.',
    autoLayout: 'Auto layout updated.',
    replaceImage: 'Replacing the selected image…',
    adjustTypography: 'Typography adjusted.',
    fixColor: 'Color palette refreshed.',
    fixSpacing: 'Spacing normalized.',
    template: 'Template generated.',
};

const normalizeResult = (intent, result) => {
    if (typeof result === 'string') {
        return { status: 'ok', message: result };
    }

    if (result && typeof result === 'object') {
        return result;
    }

    return {
        status: 'ok',
        message: RESULT_MESSAGES[intent.type] || 'All done.',
    };
};

export const runAiCommand = async (input, canvas) => {
    if (!input?.trim()) {
        return { status: 'idle', message: 'Please enter a command for the assistant.' };
    }

    if (!canvas) {
        return { status: 'error', message: 'Canvas is not ready yet.' };
    }

    const intent = await aiUnderstand(input.trim());

    if (!intent || intent.type === 'unknown') {
        return { status: 'unknown', message: "I couldn't understand that yet." };
    }

    try {
        switch (intent.type) {
            case 'alignment':
                return normalizeResult(intent, await actions.applyAlignment(canvas, intent.options));

            case 'autoLayout':
                return normalizeResult(intent, await actions.applyAutoLayout(canvas, intent.options));

            case 'replaceImage':
                return normalizeResult(intent, await actions.replaceImage(canvas, intent.query));

            case 'adjustTypography':
                return normalizeResult(intent, await actions.adjustTypography(canvas, intent.style));

            case 'fixColor':
                return normalizeResult(intent, await actions.autoColorFix(canvas));

            case 'fixSpacing':
                return normalizeResult(intent, await actions.autoSpacingFix(canvas, intent.options?.direction));

            case 'template':
                return normalizeResult(intent, await actions.createSmartTemplate(canvas, intent.templateType));

            default:
                return { status: 'unknown', message: "I'm not configured for that yet." };
        }
    } catch (error) {
        console.error('AI command failed', error);
        return { status: 'error', message: 'Something went wrong running that action.' };
    }
};
