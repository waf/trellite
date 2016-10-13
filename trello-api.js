
class TrelloApi
{
    constructor(auth) {
        this.auth = auth;
    }
    url(resource, options) {
        var query_string = Object.keys(options || {})
                                 .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(options[k]))
                                 .join('&');
        resource += "?" + query_string;
        return `https://api.trello.com/1/${resource}&key=${this.auth.key}&token=${this.auth.token}`;
    }
    boards(options) {
        return fetch(this.url('members/me/boards', options));
    }
    lists(boardId, options) {
        return fetch(this.url(`boards/${boardId}/lists`, options));
    }
}
