import { HTTP_URLS } from "../http/urls";
import { ROUTER_PATHS } from "./router_paths";

/**
 * redirecting to auth server
 */
export const redirectToAuthServer = () => {
    window.location.replace(`${HTTP_URLS.BASE}/?redirect=${window.location.origin}${ROUTER_PATHS.VALIDATE_TOKEN_REDIRECT}`);
}