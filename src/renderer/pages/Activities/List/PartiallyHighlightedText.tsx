import createFormattedText, {
    FormattedText,
} from '../../../transformers/text/formattedText';

interface Props {
    text: string;
    highlighted?: string;
}

const PartiallyHighlightedText = ({ text, highlighted }: Props) => {
    const tokens = createFormattedText(text, highlighted);
    return (
        <span>
            {tokens.map((item: FormattedText, index) => {
                const key = item.text + index;
                return (
                    <span key={key}>
                        {item.type === 'highlight' ? (
                            <span className="highlighted">{item.text}</span>
                        ) : (
                            <span>{item.text}</span>
                        )}
                    </span>
                );
            })}
        </span>
    );
};

export default PartiallyHighlightedText;
