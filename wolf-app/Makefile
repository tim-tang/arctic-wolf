# Author tim.tang
# Makefile for modular wolf app 
#
.PHONY: build

include wolf-app.mk

build:
	@for mod in $(wolf-app); do \
		@$(MAKE) -C $$mod build; \
	done

