/**
 * An array of routes that are accessible only to logged in users.
 * These routes require authentication.
 * @type {string[]}
 */

export const privateRoutes = ["/account"];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to /.
 * @type {string[]}
 */

export const authRoutes = ["/login", "/register"];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in.
 * @type {String}
 */
export const DEFAULT_LOGIN_REDIRECT = "";
