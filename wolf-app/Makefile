# Author tim.tang
# Makefile for modular wolf app 
#
.PHONY: setup build compile-tpl

include wolf-app.mk

build: setup compile-tpl build-modules 
	@echo
	@echo   "//------------------------------------------------------//"
	@echo   "//      WOLF APP BUILD & DEPLOYED SUCCESSFULLY!         //"
	@echo   "//------------------------------------------------------//"
	@echo

setup:
	@npm install
	@echo
	@echo   "-- Success To Setup Build Environment --"
	@echo

compile-tpl:
	@rm -rf ./sea-modules/wolf-app
	@grunt compile
	@echo
	@echo   "-- Success To Precompile Underscore Templates --"
	@echo

build-modules:
	@for mod in $(wolf-app); do \
		$(MAKE) -C $$mod build ; \
	done
	@grunt deploy
	@rm -rf ./wolf-app
	@echo
	@echo   "-- Success To Deploy Wolf App Modules --"
	@echo

