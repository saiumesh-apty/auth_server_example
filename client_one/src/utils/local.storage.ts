const LOGIN_TOKEN = 'LOGIN_TOKEN';


const setLocalStorage = (key: string, value: string) => {
    window.localStorage.setItem(key, value)
}

const getLocalStorage = (key: string): string | null => {
    return window.localStorage.getItem(key);
}

export const setLoginKey = (token: string) => {
    setLocalStorage(LOGIN_TOKEN, token);
}

export const getLoginKey = (): string | null => {
    return getLocalStorage(LOGIN_TOKEN);
}