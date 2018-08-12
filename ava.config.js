{
	"ava": {
		"files": [
			"my-test-directory/**/*.js",
			"!my-test-directory/exclude-this-directory/**/*.js",
			"!**/exclude-this-file.js"
		],
		"sources": [
			"**/*.{js,jsx}",
			"!dist/**/*"
		],
		"match": [
			"*oo",
			"!foo"
		],
		"cache": true,
		"concurrency": 5,
		"failFast": true,
		"failWithoutAssertions": false,
		"tap": true,
		"compileEnhancements": false,
		"require": [
			"@babel/register"
		],
		"babel": {
			"extensions": ["jsx"],
			"testOptions": {
				"babelrc": false
			}
		}
	}
}