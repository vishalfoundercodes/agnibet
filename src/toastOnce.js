// toastOnce.js
import { toast } from "react-toastify";

let toastDisplayed = false;

export const toastOnce = (message, options = {}) => {
  if (!toastDisplayed) {
    toastDisplayed = true;
    toast.warning(message, options);
    setTimeout(() => (toastDisplayed = false), 1000); // reset after 2s
  }
};
