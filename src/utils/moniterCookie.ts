import { getCookie } from "../utils/getCookie";

export function monitorCookie(name: string, callback: (value: string | null) => void , interval = 1000) {
  let lastValue = getCookie(name);

  setInterval(() => {
    const currentValue = getCookie(name);
    if (currentValue != lastValue) {
      lastValue = currentValue;
      callback(currentValue);
    }
  }, interval);
}