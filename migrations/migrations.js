const createUserTableQuery = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE IF NOT EXISTS
    users(
        id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        firstname VARCHAR NOT NULL,
        lastname VARCHAR NOT NULL,
        username VARCHAR UNIQUE NOT NULL,
        profile_img VARCHAR NULL,
        email VARCHAR UNIQUE NOT NULL,
        password VARCHAR NOT NULL,
        gender VARCHAR NOT NULL,
        jobRole VARCHAR NOT NULL,
        location VARCHAR NOT NULL,
        createdat TIMESTAMP DEFAULT NOW()
    )
`;

const createPostTableQuery = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE IF NOT EXISTS
    posts(
        id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL,
        title VARCHAR NOT NULL,
        article VARCHAR NULL,
        gif VARCHAR NULL,
        createdat TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES "users" (id) ON DELETE CASCADE
    )
`;

const createCommentTableQuery = `
    DROP TABLE IF EXISTS comments CASCADE;
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE IF NOT EXISTS
    comments(
        id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        post_id UUID NOT NULL,
        commenter_id UUID NOT NULL,
        comment VARCHAR NOT NULL,
        createdat TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (post_id) REFERENCES "posts" (id) ON DELETE CASCADE,
        FOREIGN KEY (commenter_id) REFERENCES "users" (id) ON DELETE CASCADE
    )
`;

const migrate = async (db) => {
  try {
    await db.query(createUserTableQuery);
    await db.query(createPostTableQuery);
    await db.query(createCommentTableQuery);
    return true;
  } catch (err) {
    return console.log(err);
  }
};

module.exports = migrate;
