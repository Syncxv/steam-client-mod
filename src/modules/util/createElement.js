const createElement = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstChild;
};

module.exports = createElement;
