import bind from 'decorators/bind';
import cx from 'classnames';
import forEach from 'lodash.foreach';
import Component from 'components/component';
import React from 'react';
import Options from './options';
import styles from './index.less';

export default class Combobox extends Component {
  static propTypes = {
    labels: React.PropTypes.array,
    values: React.PropTypes.array.isRequired,
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    white: React.PropTypes.bool
  };

  getInitState () {
    return {
      opened: false
    };
  }

  @bind
  toggle () {
    this.setState({
      opened: !this.state.opened
    });
  }

  @bind
  optionClicked (value) {
    const {onChange} = this.props;

    onChange && onChange(value);

    this.setState({
      opened: false
    });
  }

  render () {
    const {values, labels, value, className, style, white} = this.props;
    const {opened} = this.state;

    let label = '';
    forEach(values, (valueIt, key) => {
      if (value === valueIt) {
        label = labels && labels[key] || valueIt;
      }
    });

    return (
      <div
        className={cx(styles.combobox, white && styles.white, opened && styles.opened, className)}
        style={style}
        ref={(ref) => {this.ref = ref;}}
        onClick={this.toggle}
      >
        <div className={styles.selectedText}>{label}</div>
        <div className={styles.button}>
          <i
            className={cx(
              'nc-icon-mini',
              opened ? 'arrows-1_minimal-up' : 'arrows-1_minimal-down'
            )}
          />
        </div>
        {this.renderOptions()}
      </div>
    );
  }

  renderOptions () {
    if (this.state.opened) {
      const {labels, values, white} = this.props;

      return (
        <Options
          values={values}
          labels={labels}
          white={white}
          element={this.ref}
          onClose={this.toggle}
          onChange={this.optionClicked}
        />
      );
    }
  }
}
