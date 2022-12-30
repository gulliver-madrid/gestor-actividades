const naturalList = (itemList: string[], conjunction?: 'y' | 'o'): string => {
    const length = itemList.length;
    conjunction ??= 'y';
    switch (length) {
        case 0:
            return '';
        case 1:
            return itemList[0];
        default: {
            const commaSeparatedFirstItems = itemList.slice(0, -1).join(', ');
            const lastItem = itemList.slice(-1)[0];
            return `${commaSeparatedFirstItems} ${conjunction} ${lastItem}`;
        }
    }
};
export { naturalList };
