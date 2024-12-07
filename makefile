files := $(wildcard *.scss)
output := $(foreach file,$(files),$(shell basename -s .scss $(file)))

all:
	@echo Compiling scss to css
	@echo =====================
	@make $(output)
	@echo =====================
	@echo Compilation completed

$(output):
	@echo $@.scss to $@.css
	@sassc -t compressed $@.scss > $@.css

push:
	make all
	git push

fetch:
	git fetch
	git pull