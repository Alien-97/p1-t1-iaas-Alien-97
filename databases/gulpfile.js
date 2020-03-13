var gulp = require('gulp');
var shell = require('gulp-shell');

// ... many tasks omitted

/********************* CHAPTER 5 *********************/
// Chapter 5: Transforming Data and Testing Continuously
gulp.task(
  'c5-get-guttenberg',
  shell.task(
    /* curl option -O, --remote-name
        Write  output to a local file named like the remote file we get. (Only the file part of the remote file is used, the path
        is cut off.)
        The file will be saved in the current working directory. If you want the file saved in a different directory,  make  sure
        you change the current working directory before invoking curl with this option.
        The remote file name to use for saving is extracted from the given URL, nothing else, and if it already exists it will be
        overwritten.
    */
    'cd transforming-data-and-testing-continuously-chapter-5/data && ' +
      'curl -O https://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.bz2 &&' +
      /*
    -x      Extract to disk from the archive.  If a file with the same name appears more than once in the archive, each copy will be
          extracted, with later copies overwriting (replacing) earlier copies.
    -j      (c mode only) Compress the resulting archive with bzip2(1).  In extract or list modes, this option is ignored.  Note that,
          unlike other tar implementations, this implementation recognizes bzip2 compression automatically when reading archives.
    -f file
            Read the archive from or write the archive to the specified file.  The filename can be - for standard input or standard
          output.
    -v      Produce verbose output.  In create and extract modes, tar will list each file name as it is read from or written to the
         archive.  In list mode, tar will produce output similar to that of ls(1).  Additional -v options will provide additional
         detail.
    */
      'tar -xvjf rdf-files.tar.bz2'
  )
);

gulp.task('default', shell.task('npm test'));
