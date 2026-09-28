const crypto = require('crypto');

const users = [];

const findByUsername = (username) =>
    users.find((u) => u.username.toLowerCase() === username.toLowerCase());

const create = ({ username, password, role }) => {
    const user = { id: crypto.randomUUID(), username, password, role };
    users.push(user);
    return user;
};

const toPublic = ({ password, ...rest }) => rest;

module.exports = { users, findByUsername, create, toPublic };