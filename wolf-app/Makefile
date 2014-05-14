# Author tim.tang
# Makefile for modular wolf app 
#
.PHONY: setup build compile-tpl

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
	@echo   "-- Success To Precompile Wolf App Underscore Templates --"
	@echo

build-modules:
	@grunt build
	@rm -rf ./app-tpl
	@echo
	@echo   "-- Success To Build & Deploy Wolf App Modules --"
	@echo

