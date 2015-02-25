var React = require('react');
var styles = require('./styles');
var DATA = require('./data');

var App = React.createClass({

  getInitialState () {
    return {
      activeTabIndex: 0
    }
  },

  handleTabClick (activeTabIndex) {
    this.setState({activeTabIndex})
  },

  renderTabs () {
    var activeTabIndex = this.state.activeTabIndex;
    return this.props.name.map((character, index) => {
      return (
        <div
          key={character.name}
          onClick={this.handleTabClick.bind(this, index)}
          style={index === activeTabIndex ? styles.activeTab : styles.tab}
          >
          {character.name}
        </div>
      );
    });
  },

  renderPanel () {
    var activeTabIndex = this.state.activeTabIndex;
    var character = this.props.name[activeTabIndex];
    return (
      <div>
        <p>{character.description}</p>
      </div>
    );
  },

  render () {
    return (
      <div style={styles.app}>
        <div style={styles.tabs}>
          {this.renderTabs()}
        </div>
        <div style={styles.tabPanels}>
          {this.renderPanel()}
        </div>
      </div>
    );
  }

});

React.render(<App name={DATA}/>, document.body);