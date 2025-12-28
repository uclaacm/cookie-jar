export function setCookie(name: string, value: string | null, durationSeconds?: number) {
    document.cookie = name + "=" + (value || "") + "; max-age=" + (durationSeconds ?? "") + "; path=/";
}