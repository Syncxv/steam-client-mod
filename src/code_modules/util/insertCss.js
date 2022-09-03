const insertCss = (css, _document = window.document) => {
    let id = Math.random().toString(36);
    const style = _document.createElement('style');
    style.innerText = css;
    style.id = id;
    _document.head.appendChild(style);
    return id;
};

module.exports = insertCss;
