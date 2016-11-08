#!/usr/bin/env bash

if [[ $1 == "local" ]]; then
	npm start
else
	heroku local
fi
