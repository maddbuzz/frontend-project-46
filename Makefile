setup: install-deps
	npm link

install-deps:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx jest

test-watch:
	npx jest --watch

start:
	gendiff -h
