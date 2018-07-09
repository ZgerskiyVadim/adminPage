function username(v) {
    const re = /[A-Za-z0-9\.\,\-]+/g;
    return re.test(v)
}

function firstName(v) {
    const re = /^[a-zA-Z\s\-]*$/;
    return re.test(v)
}

function lastName(v) {
    const re = /^[a-zA-Z]*$/;
    return re.test(v)
}

function email(v) {
    const re = /\S+@\S+\.\S+/;
    return re.test(v)
}


export default {
    username,
    firstName,
    lastName,
    email
}