create TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255)
);

create TABLE list(
    id SERIAL PRIMARY KEY,
    task VARCHAR(255),
    user_id INTEGER,
    status INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
