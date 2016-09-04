export default function(gulp, plugins, config, {src}) {
  const {metaData, utils} = config;
  const {addbase, getTaskName} = utils;
  const target = getTaskName(metaData);

  if (target === 'build') {
    src.push(
      addbase('scripts', '**/*.js')
    );
  }

  return {src};
}
