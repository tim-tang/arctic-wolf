# Author tim.tang
# Makefile for project Arctic
.PHONY: server build

server:
	@python -m SimpleHTTPServer 3000

build:
	@$(MAKE) -C wolf-app build
