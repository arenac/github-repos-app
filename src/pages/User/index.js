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
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(2);

  const user = navigation.getParam('user');

  // didmount
  useEffect(() => {
    async function fetchStarred() {
      setLoading(true);
      const response = await api.get(`/users/${user.login}/starred`);
      setStars(response.data);
      setLoading(false);
    }
    fetchStarred();
  }, [setStars, setLoading]);

  const fetchNextStarred = async () => {
    const response = await api.get(
      `/users/${user.login}/starred?page=${nextPage}&per_page=20`
    );
    return response.data;
  };

  const loadMore = () => {
    setLoading(true);
    const data = fetchNextStarred();
    if (data.length > 0) {
      console.tron.log('response', data);
      setStars([...stars, data]);
      console.tron.log('stars_', stars);
      setNextPage(nextPage + 1);
    }
    setLoading(false);
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
          onStarteReached
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
