export default function(gulp, plugins, config) {
  const {ghPages} = plugins;
  const {sources, utils} = config;
  const {buildDir} = sources;
  const {addbase} = utils;
  const src = addbase(buildDir, '**/*');

  return () => {
    return gulp.src(src)
    .pipe(
      ghPages({
        force: true
      })
    );
  };
}
