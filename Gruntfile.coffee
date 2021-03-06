gruntFunction = (grunt) ->
  gruntConfig =
    pkg: grunt.file.readJSON('package.json')

    build:
      src: 'app'
      dest:
        dev:    'public' # Dev uncompressed build
        deploy: 'deploy' # Optimized version

    # Typescript
    # https://npmjs.org/package/grunt-typescript
    typescript:
      base:
        src: ['<%= build.src %>/scripts/**/*.ts']
        dest: '<%= build.dest.dev %>/scripts/main.js'
        options:
          module: 'ams'
          target: 'es3'
          # sourcemap: true
          # fullSourceMapPath: true
          # declaration: true

    # SASS
    # https://github.com/gruntjs/grunt-contrib-sass
    sass:
      dist:
        files: [
          expand: true
          cwd: '<%= build.src %>/styles'
          src:  '{,**/}*.sass'
          dest: '<%= build.dest.dev %>/styles'
          ext: '.css'
        ]
    
    # Connect
    # https://github.com/gruntjs/grunt-contrib-connect
    connect:
      dev:
        options:
          base:     '<%= build.dest.dev %>'
          hostname: '*'
          port:     5000
      deploy:
        options:
          base:     '<%= build.dest.deploy %>'
          hostname: '*'
          keepalive: true
          port:      5001

    # Watch
    # https://github.com/gruntjs/grunt-contrib-watch
    watch:
      html:
        files: ['<%= build.src %>/{,**/}*.html']
        tasks: ['copy:html']
      vendors:
        files: ['<%= build.src %>/scripts/vendors/{,**/}*.js']
        tasks: ['copy:vendors']
      fonts:
        files: ['<%= build.src %>/scripts/fonts/{,**/}*.typeface.js']
        tasks: ['copy:fonts']
      typescript:
        files: ['<%= build.src %>/scripts/{,**/}*.ts']
        tasks: ['typescript']
      sass:
        files: ['<%= build.src %>/styles/{,**/}*.sass']
        tasks: ['sass']
      assets:
        expand: true
        files: ['<%= build.src %>/assets/**']
        tasks: ['copy:assets']

    # Clean
    # https://github.com/gruntjs/grunt-contrib-clean
    clean: [
      '<%=  build.dest.dev %>'
      '<%=  build.dest.deploy %>'
    ]

    # Copy files
    # https://github.com/gruntjs/grunt-contrib-copy
    copy:
      html:
        files: [
          src: ['<%= build.src %>/index.html']
          dest: '<%=  build.dest.dev %>/index.html'
        ]

      js:
        files: [
          expand: true
          cwd: '<%= build.src %>/scripts'
          src: ['*.js']
          dest: '<%=  build.dest.dev %>/scripts'
          ext: '.js'
        ]

      vendors:
        files: [
          expand: true
          cwd: '<%= build.src %>/scripts/vendors'
          src: ['**/*.js']
          dest: '<%=  build.dest.dev %>/scripts/vendors'
          ext: '.js'
        ]

      fonts:
        files: [
          expand: true
          cwd: '<%= build.src %>/scripts/fonts'
          src: ['**/*.js']
          dest: '<%=  build.dest.dev %>/scripts/fonts'
          ext: '.typeface.js'
        ]
      
      css:
        files: [
          expand: true
          cwd: '<%= build.src %>/styles'
          src: ['*.css']
          dest: '<%=  build.dest.dev %>/styles'
          ext: '.css'
        ]
      
      assets:
        files: [
          expand: true
          cwd: '<%= build.src %>/assets'
          src: ['**/*']
          dest: '<%=  build.dest.dev %>/assets'
        ]


  grunt.initConfig( gruntConfig )

  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-typescript')
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-connect')

  grunt.registerTask('dev', [
    'clean'
    'typescript'
    'sass'
    'copy:html'
    'copy:vendors'
    'copy:fonts'
    'connect:dev'
    'watch'
  ])

  grunt.registerTask('deploy', [
    'clean'
    'typescript'
    'copy:js'
    'sass'
    'copy:css'
    'copy:html'
    'copy:assets'
  ])
  
  grunt.registerTask('default', ['dev'])

module.exports = gruntFunction