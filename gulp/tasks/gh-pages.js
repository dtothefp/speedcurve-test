export default function(gulp, plugins, config) {
  const {ghPages} = plugins;
  const {sources, utils} = config;
  const {buildDir} = sources;
  const {addbase} = utils;
  // const {GITHUB_API_KEY} = process.env;
  const src = addbase(buildDir, '**/*');

  const remoteUrl = 'git@github.com:dtothefp/speedcurve-test.git';

  return () => {
    return gulp.src(src)
    .pipe(
      ghPages({
        remoteUrl,
        force: true
      })
    );
  };
}
