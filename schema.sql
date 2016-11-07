-- Create user TABLE
-- password could be CHAR() depending on hashing also used
CREATE TABLE USERS (
  user_id      SERIAL         NOT NULL PRIMARY KEY,
  user_name    VARCHAR(30) NOT NULL,
  user_pass    VARCHAR(30) NOT NULL,
  user_created DATE        NOT NULL,
  user_health  INT         NOT NULL,
  user_exp     INT         NOT NULL
);
-- Create user character table
-- Because color codes are fixed length, colors are all 6 in length.
-- One user may have many 'outfits'
CREATE TABLE PREFERENCES (
  pref_id    INT     NOT NULL PRIMARY KEY,
  user_id    INT     NOT NULL REFERENCES USERS(user_id),
  skinCol    CHAR(6) NOT NULL,
  hairCol    CHAR(6) NOT NULL,
  teeCol     CHAR(6) NOT NULL,
  trouserCol CHAR(6) NOT NULL,
  eyeCol     CHAR(6) NOT NULL,
  shoeCol    CHAR(6) NOT NULL
);

-- one user has many todos
CREATE TABLE TODO (
  todo_id    INT NOT NULL PRIMARY KEY,
  user_id    INT NOT NULL REFERENCES USERS(user_id),
  todo_title VARCHAR(30) NOT NULL,
  todo_text  VARCHAR(255)
);
