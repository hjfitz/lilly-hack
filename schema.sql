-- Create user TABLE
-- password could be CHAR() depending on hashing also used

-- connect to database!
-- source ~/.profile
-- heroku pg:psql --app lilly-hack-hjf

CREATE TABLE USERS (
  user_id      SERIAL      NOT NULL PRIMARY KEY,
  user_name    VARCHAR(30) NOT NULL,
  user_pass    VARCHAR(30) NOT NULL,
  user_created DATE        NOT NULL, --there is literally no point in keeping this.... for now...
  user_health  INT         NOT NULL,
  user_exp     INT         NOT NULL
);
-- Create user character table
-- Because color codes are fixed length, colors are all 6 in length.
-- One user may have many 'outfits'
CREATE TABLE PREFERENCES (
  pref_id    SERIAL     NOT NULL PRIMARY KEY,
  user_id    INT     NOT NULL REFERENCES USERS(user_id),
  skinCol    CHAR(7) NOT NULL,
  hairCol    CHAR(7) NOT NULL,
  teeCol     CHAR(7) NOT NULL,
  trouserCol CHAR(7) NOT NULL,
  eyeCol     CHAR(7) NOT NULL,
  shoeCol    CHAR(7) NOT NULL
);

-- one user has many todos
CREATE TABLE TODO (
  todo_id         SERIAL        NOT NULL PRIMARY KEY,
  user_id         INT           NOT NULL REFERENCES USERS(user_id),
  todo_title      VARCHAR(30)   NOT NULL,
  todo_text       VARCHAR(255)  NOT NULL,
  todo_healthgain INT           NOT NULL,
  todo_expgain    INT           NOT NULL
);

-- general insert should be structured as follows in the db.js file (yet to be created)
-- btw, double quotes makes postgres shit the based
INSERT INTO USERS (user_name, user_pass, user_created, user_health, user_exp)
  VALUES ('harry','god','1995-12-08',60,60);
-- where the data is yyyy-mm-dd (datatype DATE must be in single quotes)
INSERT INTO TODO (user_id, todo_title,todo_text)
  VALUES (1,'test','test task');
INSERT INTO PREFERENCES (user_id, skinCol, hairCol, teeCol, trouserCol, eyeCol, shoeCol)
  VALUES (1, "FF00FF", "000000", "0000FF", "00FF00", "FF0000", "00FFFF");
