import React from 'react';
import PropTypes from 'prop-types';
import WebView from 'react-native-webview';

const Repository = ({ navigation }) => {
  const repository = navigation.getParam('repository');

  return <WebView source={{ uri: repository.html_url }} style={{ flex: 1 }} />;
};

Repository.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('repository').name,
});

Repository.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};

export default Repository;
