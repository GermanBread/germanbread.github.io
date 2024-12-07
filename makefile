files := $(wildcard *.scss)
output := $(foreach file,$(files),$(shell basename -s .scss $(file)))

all:
	@echo Compiling scss to css
	@echo =====================
	@make $(output)
	@echo =====================
	@echo Compilation completed

$(output):
	@echo Processing $@
	sassc -t compressed $@.scss > $@.css

test: all
	chromium --app=file://$(shell pwd)/index.html