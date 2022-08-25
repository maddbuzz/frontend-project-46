install: install-deps
	npm link

install-deps:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

# brain-games:
# 	node bin/brain-games.js
