const cli = require('minimist');
const GitHubApi = require('github');

const argv = cli(process.argv.slice(2));
const {GITHUB_API_KEY} = process.env;

argv.token = argv.token || GITHUB_API_KEY;
argv.sha = argv.sha || 'gh-pages';
argv.user = argv.user || 'dtothefp';
argv.repo = argv.repo || 'speedcurve-test';
argv.state = argv.state || 'pending';
argv['target-url'] = argv['target-url'] || 'https://www.google.com/';
argv.description = argv.description || 'You\'re @hfa/perf tests are pending...wait for it!!';
argv.context = argv.context || 'ci/slow-your-role';

const defaultOptions = {
  version: '3.0.0',
  protocol: 'https',
  timeout: 5000,
  headers: { 'user-agent': 'speedcurve-status-reporter' },
  Promise
};

/**
 * @param token
 * @param [github] Github Interface
 * @constructor
 */
class StatusReporter extends GitHubApi {
  constructor(token, opts = {}) {
    super(
      Object.assign({}, defaultOptions, opts)
    );

    this.authenticate({
      type: 'token',
      token
    });

    this.update().then(data => {
      const {state, url} = data;

      console.log(`Successfully updated status of ${state} from ${url}`);
    }).catch(err => {
      console.error(err.message, err.stack);
    });
  }

  update() {
    const {sha} = argv;
    let prom;

    if (sha && sha.length !== 40) {
      prom = this.withBranch(argv.sha).then(data => {
        return data.commit.sha;
      });
    } else {
      prom = Promise.resolve(sha);
    }

    return prom.then(sha => {
      return this.postUpdates(sha);
    });
  }

  withBranch(branch) {
    return this.repos.getBranch({
      user: argv.user,
      repo: argv.repo,
      branch
    }).catch(err => {
      console.error(`error retrieving branch data for branch: ${branch}`);
    });
  }

  postUpdates(sha) {
    return this.repos.createStatus(
      Object.assign({}, argv, {sha})
    ).catch(err => {
      console.error(`error posting status updates for sha: ${sha}`, err.message, err.stack);
    });
  }

  pullRequest() {
    const {user, repo} = argv;

    return this.pullRequests.getAll({
      user,
      repo
    }).catch(err => {
      console.error(`error retrievign pull request for user: ${user}, and repo: ${repo}`);
    });
  }

  withBranchPullRequest(branch) {
    return this.pullRequest().then(res => {
      let index;

      for (let i = 0; i < res.length; i++) {
        const resI = res[i];
        const ref = resI && resI.head && resI.head.ref;

        if (ref && ref === branch) {
          index = i;
          break;
        }
      }

      if (!index) {
        throw new Error(`could not find branch: ${branch} in pull requests`);
      }

      return res[index];
    });
  }
}

new StatusReporter(GITHUB_API_KEY);

// repos.createStatus
// {
  // ca: undefined
  // headers: {
    // accept: "application/vnd.github.v3+json"
    // content-length: 88
    // content-type: "application/json; charset=utf-8"
    // host: "api.github.com"
    // user-agent: "speedcurve-status-reporter"
  // }
  // host: "api.github.com"
  // method: "post"
  // path: "/repos/dtothefp/speedcurve-test/statuses/c3e8ee2bb643bec177bff0736ca663afd013f992"
  // port: 443
// }
