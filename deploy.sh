#!/bin/bash

git config user.name "dtothefp"
git config user.email "dtothefp@gmail.com"

git remote rm origin
git remote add origin https://dtothefp:${GITHUB_API_KEY}@github.com/dtothefp/speedcurve-test.git
