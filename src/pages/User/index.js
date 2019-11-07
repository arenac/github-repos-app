import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';

import api from '../../services/api';
import { usePrevious } from '../../hooks';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

const User = ({ navigation }) => {
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(2);

  const user = navigation.getParam('user');

  const fetchStarred = async (page = 1) => {
    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page },
    });
    setStars(page >= 2 ? [...stars, ...response.data] : response.data);
    setPage(page);
    setLoading(false);
  };

  // didmount
  useEffect(() => {
    fetchStarred();
  }, [setStars, setLoading]);

  const loadMore = async () => {
    fetchStarred(page + 1);
  };

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size="large" color="#333" />
        </View>
      ) : (
        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          onEndReachedThreshold={0.2}
          onEndReached={loadMore}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      )}
    </Container>
  );
};

User.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('user').name,
});

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

export default User;
