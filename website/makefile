all:
	npm run build

deploy: all
	rm -rf ../docs
	cp -rL public ../docs
	rm -f ../docs/build/bundle.js.map
	rm -f ../docs/build/cache/mkcache.js