# Makefile for Wechaty Getting Started
#
# 	GitHb: https://github.com/wechaty/wechaty-getting-started
# 	Author: Huan LI <zixia@zixia.net> https://github.com/huan
#

.PHONY: all
all : install bot

.PHONY: clean
clean:
	npm run clean

.PHONY: lint
lint: npm run lint

.PHONY: install
install:
	npm install

.PHONY: test
test:
	npm test

.PHONY: bot
bot:
	npm start
