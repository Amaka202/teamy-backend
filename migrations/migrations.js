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
        department VARCHAR NOT NULL,
        createdat TIMESTAMP DEFAULT NOW()
    )
`;

const createGifTableQuery = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE IF NOT EXISTS
    gifs(
        id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL,
        title VARCHAR NOT NULL,
        gifUrl VARCHAR NOT NULL,
        createdat TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES "users" (id) ON DELETE CASCADE
    )
`;

const createArticleTableQuery = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE IF NOT EXISTS
    articles(
        id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL,
        title VARCHAR NOT NULL,
        article VARCHAR NOT NULL,
        createdat TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES "users" (id) ON DELETE CASCADE
    )
`;

const createCommentTableQuery = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE IF NOT EXISTS
    comments(
        id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        article_id UUID NULL,
        gif_id UUID NULL,
        comment VARCHAR NOT NULL,
        createdat TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (article_id) REFERENCES "articles" (id) ON DELETE CASCADE,
        FOREIGN KEY (gif_id) REFERENCES "gifs" (id) ON DELETE CASCADE
    )
`;

const migrate = async (db) => {
  try {
    await db.query(createUserTableQuery);
    await db.query(createGifTableQuery);
    await db.query(createArticleTableQuery);
    await db.query(createCommentTableQuery);
    return true;
  } catch (err) {
    return console.log(err);
  }
};

module.exports = migrate;
