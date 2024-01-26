FOSWIKI_ROOT?=~/foswiki/core
TARGET=build/pkg.js 

PKG_SOURCE=lib/jen.js src/passwordGenerator.js

-include $(FOSWIKI_ROOT)/pub/System/JQueryPlugin/Makefile.include

clean:
	rm -f build/*

build/pkg.uncompressed.js: $(PKG_SOURCE)
	@echo generating $@
	@test -d build || mkdir build
	@cat $^ > $@

