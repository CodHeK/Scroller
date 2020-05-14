let scroll_debounce = null, popUp = false;

const getDocumentHeight = () => {
    let height = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );

    return height;
}

const buildPopUp = (windowScroll) => {    
    const documentHeight = getDocumentHeight();
    const windowHeight = document.documentElement.clientHeight;

    let percentage = Math.round(((windowScroll + windowHeight) * 100) / documentHeight);

    const top = (percentage * windowHeight) / 100;

    const $popUp = document.createElement('div');

    $popUp.textContent = `${percentage}% -`;
    $popUp.id = 'scroller-popup';
    
    $popUp.style.cssText = `
        position: absolute;
        width: 80px;
        height: 25px;
        border-radius: 10px;
        text-align: center;
        padding-top: 5px;
        font-size: 14px;
        font-family: "Courier New", Courier, monospace;
        letter-spacing: 1.5px;
        z-index: 1000;
        top: ${windowScroll + top - 30}px;
        right: 0px;
        background-color: transparent;
        color: #000;
        font-weight: bold;
    `;

    document.body.appendChild($popUp);
    popUp = true;
}

const removePopUp = () => {
    const $popUp = document.getElementById('scroller-popup');

    document.body.removeChild($popUp);
    popUp = false;
}

window.addEventListener('scroll', e => {
    clearTimeout(scroll_debounce);

    popUp && removePopUp();

    scroll_debounce = setTimeout(() => {
        const windowScroll = window.scrollY;

        !popUp && buildPopUp(windowScroll);
    }, 200);
});