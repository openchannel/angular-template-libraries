export function replaceHTMLTags(text: string): string {
    if (text && text.match(/<[^>]*>/g)) {
        const tmp = document.createElement('div');
        tmp.innerHTML = text;
        return tmp.textContent || tmp.innerText || '';
    }
    return text;
}
