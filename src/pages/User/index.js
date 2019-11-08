import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';

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
  Loading,
} from './styles';

const User = ({ navigation }) => {
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);

  const user = navigation.getParam('user');

  const fetchStarred = async (_page = 1) => {
    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page: _page },
    });
    setStars(_page >= 2 ? [...stars, ...response.data] : response.data);
    setPage(_page);
    setLoading(false);
    setRefresh(false);
  };

  // didmount
  useEffect(() => {
    fetchStarred();
  }, []);

  const loadMore = () => {
    fetchStarred(page + 1);
  };

  const refreshList = () => {
    setRefresh(true);
    setStars([]);
    fetchStarred();
  };

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>
      {loading ? (
        <Loading />
      ) : (
        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          onEndReachedThreshold={0.2}
          onEndReached={loadMore}
          onRefresh={refreshList}
          refreshing={refresh}
          renderItem={({ item }) => (
            <Starred
              onPress={() =>
                navigation.navigate('Repository', { repository: item })
              }
            >
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
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};

export default User;
