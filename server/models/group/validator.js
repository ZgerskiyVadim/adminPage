export function name(v) {
    const re = /^[a-zA-Z0-9.,-]+$/;
    return re.test(v);
}
