USE flask_ift3225;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nickname  text not null unique,
    passwd text null,
    online Boolean default false,
    score INTEGER DEFAULT 0,
    role text not null
);