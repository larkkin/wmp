module.exports = function (grunt) {

    grunt.initConfig({
        ts: {
            modules: {
                src: ["app/*.ts"],
                out: "resources/js/compiled/modules.js"
            },
            root: {
                src: ["app/robots/*.ts"],
                out: "resources/js/compiled/root.js"
            },
            editor: {
                src: ["app/robots/diagram/**/*.ts"],
                out: "resources/js/compiled/editor.js"
            },
            interpreter: {
                src: ["app/robots/interpreter/**/*.ts"],
                out: "resources/js/compiled/interpreter.js"
            },
            twoDModelRobots: {
                src: ["app/robots/twoDModel/**/*.ts"],
                out: "resources/js/compiled/two-d-model-robots.js"
            },
            gestures: {
                src: ["app/common/gestures/*.ts"],
                out: "resources/js/compiled/gestures.js"
            },
            menu: {
                src: ["app/common/menu/**/*.ts"],
                out: "resources/js/compiled/menu.js"
            },
            options: {
                target: 'es6'
            }
        }
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.registerTask("default", ["ts:modules", "ts:root", "ts:interpreter", "ts:twoDModelRobots", "ts:gestures",
        "ts:menu", "ts:editor"]);
}