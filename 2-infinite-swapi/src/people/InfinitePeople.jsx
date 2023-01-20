import InfiniteScroll from 'react-infinite-scroller';
import { Person } from './Person';
import { useInfiniteQuery } from 'react-query';

const initialUrl = 'https://swapi.dev/api/people/';
const fetchUrl = async url => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'sw-people',
    function ({ pageParam = initialUrl }) {
      fetchUrl(pageParam);
    },
    {
      getNextPageParam: function (lastPage) {
        return lastPage.next || undefined;
      },
    }
  );
  // TODO: get data for InfiniteScroll via React Query
  return <InfiniteScroll />;
}
