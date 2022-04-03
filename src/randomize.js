export const randomize = (min, max) => {
    Math.floor(Math.random() * (max - min + 1) + min)
}

export const randomBoolean = Math.random() < 0.5

export const randomizeArrayNumber = (count) => {
    const source = Array.from(Array(count).keys())
    for (let i = source.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [source[i], source[j]] = [source[j], source[i]];
    }
    return source
}
