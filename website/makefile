all:
	npm run build

deploy: all
	rm -rf ../docs
	cp -rL public ../docs
	rm -f ../docs/build/bundle.js.map
