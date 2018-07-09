function getPermittedProps (body) {
    const set = {};
    for (const property in body) {
        if (body[property]) {
            set[property] = body[property];
        }
    }
    return set;
}

 export default {
    getPermittedProps
};