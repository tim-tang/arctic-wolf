# Author tim.tang
# Makefile for project Arctic
.PHONY: server

server:
	@python -m SimpleHTTPServer 3000
