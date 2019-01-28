/**
 * Get git config user info
 * author: winson
 * email: 50128558@qq.com
 */

const {spawnSync} = require('child_process');

module.exports = getUser = () => {
  const {stdout} = spawnSync('git', ['config', '-l']);
  const gitCfgs = stdout.toString().split('\n');
  let cfgs = {};
  gitCfgs.map(item => {
    const a = item.split('=');
    cfgs = {
      ...cfgs,
      [a[0]]: a[1]
    }
  });
  return cfgs;
}
