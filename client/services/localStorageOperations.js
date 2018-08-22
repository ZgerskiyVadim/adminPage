
class LocalStorageOperations {

    getItem(key) {
        return JSON.parse(localStorage.getItem(key)) || null
    }

    setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    remove(key) {
        localStorage.removeItem(key)
    }

}

export default new LocalStorageOperations();