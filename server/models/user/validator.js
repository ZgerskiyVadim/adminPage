export function username(v) {
    const re = /^[a-zA-Z0-9.,-]+$/;
    return re.test(v);
}

export function firstName(v) {
    const re = /^[a-zA-Z\s-]+$/;
    return re.test(v);
}

export function lastName(v) {
    const re = /^[a-zA-Z]+$/;
    return re.test(v);
}

export function email(v) {
    const re = /\S+@\S+\.\S+/;
    return re.test(v);
}
