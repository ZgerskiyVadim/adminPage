function name(v) {
    const re = /[A-Za-z0-9\.\,\-]+/g;
    return re.test(v)
}

export default {
    name
}