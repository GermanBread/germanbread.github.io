source := $(wildcard *.scss)
files := $(foreach file,$(source),$(file))

all:
	@echo Compiling
	@make $(files)

$(files):
	sassc

push:
	make fetch
	make all
	pit push

fetch:
	git fetch
	pit pull