install: install-deps
	npm link

install-deps:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx jest
	# npm test

start:
	gendiff -h
