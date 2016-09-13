import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import styles from './local.css';

const {container, ...colors} = styles;
const styleNames = Object.values(colors);
const len = styleNames.length;

export default class Hello extends Component {
  static propTypes = {
    userName: PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {color: styleNames[0]};
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const i = styleNames.indexOf(this.state.color);

      if (i === len - 1) {
        this.setState({ color: styleNames[0] });
      } else {
        this.setState({ color: styleNames[i + 1]});
      }

    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {userName} = this.props;

    return (
      <div className={cx(container)}>
        <h1 className={cx(this.state.color)}>Hellooooooo {userName}!!!</h1>
      </div>
    );
  }
}
