files_scss := $(wildcard *.scss)
output_scss := $(foreach file,$(files_scss),$(shell basename -s .scss $(file)))

all:
	@echo Cleaning compiled files ...
	@rm -rf compiled
	@mkdir -p compiled
	@echo DONE
	
	@echo Compiling scss ...
	@make $(output_scss)
	@echo DONE

	@echo Compiling TypeScipt ...
	@tsc
	@echo DONE

$(output_scss):
	@sassc -t compressed $@.scss > compiled/$@.css

deploy: all
	@echo Deploying site to ../docs 🚀
	@rm -rf ../docs
	@mkdir -p ../docs
	@cp -r compiled ../docs/compiled
	@cp -r images ../docs/images
	@cp -r locales ../docs/locales
	@cp *.html ../docs/
	@echo DONE 🥳

serve: all
	@npx serve