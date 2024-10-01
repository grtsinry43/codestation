export default [
    {path: "/issues", needLogin: false},
    {path: "/issues/:id", needLogin: false},
    {path: "/books", needLogin: false},
    {path: "/books/:id", needLogin: false},
    {path: "/interviews", needLogin: false},
    {path: "/personal", needLogin: true},
    {path: "/addIssue", needLogin: true},
    {path: "/search", needLogin: false},
    {path: "/", needLogin: false},
];
