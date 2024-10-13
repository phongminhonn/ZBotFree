module.exports = function(grunt) {
    // Cấu hình các tác vụ Grunt
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                mangle: false // Không làm rối tên biến
            },
            my_target: {
                files: {
                    'dest/output.min.js': ['src/input.js'] // Đường dẫn tới tệp nguồn và tệp đầu ra
                }
            }
        }
    });

    // Tải plugin
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Định nghĩa các tác vụ mặc định
    grunt.registerTask('default', ['uglify']);
};
