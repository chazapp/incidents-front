import axios from "axios"
import DomParser from "dom-parser";

const parseCSRFToken = (html: string) => {
   const parser = new DomParser();
    const doc = parser.parseFromString(html);
    const nodes = doc.getElementsByName("csrfmiddlewaretoken");
    if (nodes && nodes.length > 0) {
        const node = nodes[0];
        const csrf = node.getAttribute("value");
        if (csrf) {
            return csrf;
        }
    }
    return Promise.reject("No CSRF token found");
}

export const getCsrfToken = () => {
    return axios.get("/auth/").then((response) => {
        return parseCSRFToken(response.data);
    }).catch((error) => {
        return parseCSRFToken(error.response.data);
    });
}