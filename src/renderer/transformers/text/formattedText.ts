interface FormattedText {
    text: string;
    type: 'regular' | 'highlight';
}

const createFormattedText = (
    text: string,
    toHighlight?: string
): FormattedText[] => {
    const tokens: FormattedText[] = [];
    let rest = text;
    toHighlight = toHighlight?.toLowerCase();
    if (toHighlight) {
        while (rest) {
            const lowerRest = rest.toLowerCase();
            const index = lowerRest.indexOf(toHighlight);
            if (index !== -1) {
                tokens.push({
                    text: rest.substring(0, index),
                    type: 'regular',
                });
                const endHighlightedPortion = index + toHighlight.length;
                const highlightedPortion = rest.substring(
                    index,
                    endHighlightedPortion
                );
                rest = rest.substring(endHighlightedPortion);
                tokens.push({ text: highlightedPortion, type: 'highlight' });
            } else {
                tokens.push({ text: rest, type: 'regular' });
                rest = '';
            }
        }
    } else {
        tokens.push({ text, type: 'regular' });
    }
    return tokens;
};

export type { FormattedText };
export default createFormattedText;
