const root = getRoot();

function getRoot() {
    return document.querySelector<HTMLElement>('#root');
}

export function setColors(backgroundColor: string, foregroundColor: string) {
    root?.style.setProperty('--background-color', backgroundColor);
    root?.style.setProperty('--foreground-color', foregroundColor);
}

export function normalize(path: string) {
    let lowerName = path.split('/')[1];
    const name = lowerName[0].toUpperCase() + lowerName.slice(1);
    return name;
}