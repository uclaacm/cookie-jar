export function eraseCookie(name: string) {   
    document.cookie = name + "=; path=/";
}