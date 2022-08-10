CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    PRIMARY KEY(id)
);

-- create an account database linking to the user TABLE
CREATE TABLE accounts (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT,
    balance INT,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);