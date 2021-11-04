# Makefile for Wechaty Getting Started
#
# 	GitHb: https://github.com/wechaty/getting-started
# 	Author: Huan LI <zixia@zixia.net> https://github.com/huan
#
# Make commands supported:
#   install
#   bot
#   lint
#   test
#   clean
#

.PHONY: all
all : install bot

.PHONY: install
install:
	npm install

.PHONY: bot
bot:
	npm start

.PHONY: clean
clean:
	npm run clean

.PHONY: lint
lint: npm run lint

.PHONY: test
test:
	npm test

