import { openaiClient } from '../engines/openaiClient';

export const autoTypography = async (content) => {
    return openaiClient({ content }, 'layout/typography');
};
