module.exports = function (grunt) {

    grunt.initConfig({
        ts: {
            editorCore: {
                src: ["app/core/editorCore/**/*.ts"],
                out: "resources/js/compiled/editor-core.js"
            },
            utils: {
                src: ["app/utils/**/*.ts"],
                out: "resources/js/compiled/utils.js"
            },
            options: {
                target: 'es6'
            }
        }
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.registerTask("default", ["ts:editorCore", "ts:utils"]);
}
