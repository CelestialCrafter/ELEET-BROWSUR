module.exports = function(grunt) {
  grunt.initConfig({
    'create-windows-installer': {
      ia32: {
        appDirectory: './release-builds/eleet-browsur-win32-ia32',
        outputDirectory: './dist',
        name: 'ELEET-BROWSUR',
        description: 'An ELEET BROWSUR with integrated AdBlocker, and more',
        authors: 'CelestialCrafter',
        exe: 'ELEET-BROWSUR.exe'
      }
    }
  });

  grunt.loadNpmTasks('grunt-electron-installer');
};
