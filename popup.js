let scroll_debounce = null, popUp = false;

const buildPopUp = (windowScroll) => {    
    const documentSize = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    const windowSize = document.documentElement.clientHeight;

    let percentage = Math.round(((windowScroll + windowSize) * 100)/documentSize);

    const top = (percentage * windowSize) / 100;

    const $popUp = document.createElement('div');

    $popUp.textContent = `${percentage}%`;
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
        right: 5px;
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