import React from 'react';
import PropTypes from 'prop-types';
import WebView from 'react-native-webview';

import { Container, Header, Name } from './styles';

const Repository = ({ navigation }) => {
  const repository = navigation.getParam('repository');

  return (
    <Container>
      <Header>
        <Name>{repository.name}</Name>
      </Header>
      <WebView source={{ uri: repository.html_url }} style={{ flex: 1 }} />
    </Container>
  );
};

Repository.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};

export default Repository;
