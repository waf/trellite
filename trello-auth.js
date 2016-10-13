/**
 * Manages the trello api key and token
 */
class TrelloAuth
{
    constructor(location = window.location, storage = window.localStorage) {
        this.location = location;
        this.storage = storage;
    }
    ensureAuthorized(key) {
        this.key = key;
        this.token = this._getToken(location);
        if(!this.token) {
            this._authorize(location);
        }
    }
    _getToken(location) {
        // try getting token from localstorage
        var token = this.storage.getItem('token');
        if(token) {
            return token;
        }
        // fall back to the hash if we're in the second step of oauth
        var tokenRegex = /[&#]?token=([0-9a-f]{64})/;
        token = tokenRegex.exec(location.hash);
        // no token, start the first step of oauth
        if(!token) {
            return null;
        }
        // we got a token, put it in localstorage for next time
        location.hash = location.hash.replace(tokenRegex, "");
        this.storage.setItem('token', token[1]);
        return token[1];
    }
    _authorize(location) {
        var auth_vars = {
            response_type: 'token',
            callback_method: 'fragment',
            scope: 'read,write',
            expiration: 'never',
            name: 'Trellite',
            key: this.key,
            redirect_uri: location.href
        };
        var query_string = Object.keys(auth_vars)
                                 .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(auth_vars[k]))
                                 .join('&');
        location.href = "https://trello.com/1/authorize?" + query_string;
    }
}

