module.exports = function(grunt) {
    // Cấu hình các tác vụ Grunt ở đây
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Thêm cấu hình cho các tác vụ ở đây
    });

    // Tải các plugin Grunt
    grunt.loadNpmTasks('grunt-contrib-uglify'); // Ví dụ, tải plugin uglify

    // Định nghĩa các tác vụ mặc định
    grunt.registerTask('default', ['uglify']);
};
