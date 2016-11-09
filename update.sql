-- pretty awkward to write straight in to the js, pls don't mess up my database

"update PREFERENCES
set skincol = '" + req.body.skinCol + "',
set haircol = '" + req.body.hairCol + "',
set teecol = '" + req.body.teeCol + "',
set trousercol = '" + req.body.trouserCol + "',
set eyecol = '" + req.body.eyeCol + "',
set shoecol= '" + req.body.shoeCol + "'
where user_id = " + req.body.userId + ";"
