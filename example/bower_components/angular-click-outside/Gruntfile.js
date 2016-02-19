module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Bumped to release v%VERSION%',
                commitFiles: ['package.json', 'bower.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'upstream',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: false,
                regExp: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-bump');

    /**\/
    $ grunt bump
    >> Version bumped to 0.0.2
    >> Committed as "Release v0.0.2"
    >> Tagged as "v0.0.2"
    >> Pushed to origin

    $ grunt bump:patch
    >> Version bumped to 0.0.3
    >> Committed as "Release v0.0.3"
    >> Tagged as "v0.0.3"
    >> Pushed to origin

    $ grunt bump:minor
    >> Version bumped to 0.1.0
    >> Committed as "Release v0.1.0"
    >> Tagged as "v0.1.0"
    >> Pushed to origin

    $ grunt bump:major
    >> Version bumped to 1.0.0
    >> Committed as "Release v1.0.0"
    >> Tagged as "v1.0.0"
    >> Pushed to origin

    $ grunt bump:patch
    >> Version bumped to 1.0.1
    >> Committed as "Release v1.0.1"
    >> Tagged as "v1.0.1"
    >> Pushed to origin

    $ grunt bump:git
    >> Version bumped to 1.0.1-ge96c
    >> Committed as "Release v1.0.1-ge96c"
    >> Tagged as "v1.0.1-ge96c"
    >> Pushed to origin

    $ grunt bump:prepatch
    >> Version bumped to 1.0.2-0
    >> Committed as "Release v1.0.2-0"
    >> Tagged as "v1.0.2-0"
    >> Pushed to origin

    $ grunt bump:prerelease
    >> Version bumped to 1.0.2-1
    >> Committed as "Release v1.0.2-1"
    >> Tagged as "v1.0.2-1"
    >> Pushed to origin

    $ grunt bump:patch # (major, minor or patch) will do this
    >> Version bumped to 1.0.2
    >> Committed as "Release v1.0.2"
    >> Tagged as "v1.0.2"
    >> Pushed to origin

    $ grunt bump:preminor
    >> Version bumped to 1.1.0-0
    >> Committed as "Release v1.1.0-0"
    >> Tagged as "v1.1.0-0"
    >> Pushed to origin

    $ grunt bump
    >> Version bumped to 1.1.0
    >> Committed as "Release v1.1.0"
    >> Tagged as "v1.1.0"
    >> Pushed to origin

    $ grunt bump:premajor (with prerelaseName set to 'rc' in options)
    >> Version bumped to 2.0.0-rc.0
    >> Committed as "Release v2.0.0-rc.0"
    >> Tagged as "v2.0.0-rc.0"
    >> Pushed to origin

    $ grunt bump
    >> Version bumped to 2.0.0
    >> Committed as "Release v2.0.0"
    >> Tagged as "v2.0.0"
    >> Pushed to origin

    $ grunt bump:prerelease  # from a released version `prerelease` defaults to prepatch
    >> Version bumped to 2.0.1-rc.0
    >> Committed as "Release v2.0.1-rc.0"
    >> Tagged as "v2.0.1-rc.0"
    >> Pushed to origin
    /**/
};
