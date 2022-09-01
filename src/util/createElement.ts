export const createElement = (html: string) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.firstChild as Node;
};
