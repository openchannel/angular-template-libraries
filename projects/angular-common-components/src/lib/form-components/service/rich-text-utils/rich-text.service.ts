export class RichTextUtils {
    static SPACES = ['&nbsp;', ' '];

    static trimRichText(htmlText: string): string {
        if (!htmlText || typeof htmlText !== 'string') {
            return htmlText;
        }
        const subString: string[] = htmlText.split(/(<[^>]*>)/g);
        const leftArr = [];
        const rightArr = [];
        let leftIndex: any;
        let rightIndex: any;

        for (leftIndex of Object.keys(subString).map(Number)) {
            if (this.trimText(leftArr, subString[leftIndex], text => this.trimTextFromLeftSide(text))) {
                break;
            }
        }

        for (rightIndex of Object.keys(subString)
            .slice(leftIndex + 1)
            .reverse()
            .map(Number)) {
            if (this.trimText(rightArr, subString[rightIndex], text => this.trimTextFromRightSide(text))) {
                break;
            }
        }

        if (leftIndex + 1 === rightIndex) {
            leftArr[leftIndex] = this.trimTextFromRightSide(leftArr[leftIndex]);
        }

        return [...leftArr, ...subString.slice(leftIndex + 1, rightIndex), ...rightArr.reverse()].join(''); // NOSONAR the reverse is correct for this case
    }

    private static trimText(result: string[], text: string, trimFn: (text: string) => string): boolean {
        if (text.startsWith('<')) {
            result.push(this.trimTextFromRightSide(this.trimTextFromLeftSide(text)));
        } else {
            const newText = trimFn(text);
            result.push(newText);
            if (newText) {
                return true;
            }
        }
        return false;
    }

    private static trimTextFromLeftSide(text: string): string {
        let position = 0;
        while (true) {
            const cnt = this.SPACES.find(sp => text.startsWith(sp, position))?.length || 0;
            if (!cnt) {
                break;
            }
            position += cnt;
        }
        return position > 0 ? text.substring(position) : text;
    }

    private static trimTextFromRightSide(text: string): string {
        let position = text.length;
        while (true) {
            const cnt = this.SPACES.find(sp => text.endsWith(sp, position))?.length || 0;
            if (!cnt) {
                break;
            }
            position -= cnt;
        }
        return position !== text.length ? text.substring(0, position) : text;
    }
}
