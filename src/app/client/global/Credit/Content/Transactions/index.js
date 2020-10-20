import React from "react";
import styled from "styled-components";
import C from "Root/constants";
import Transaction from "./Transaction";
import { useQuery } from "@apollo/react-hooks";
import useHistory from "Root/hooks/useHistory";
import api from "Root/api";
import { AuthContext } from "Root/contexts/auth";
import StyledComponents, { Components } from "Root/StyledComponents";

const StyledContainer = styled.div`
  ${C.styles.flex.flexColumn};
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.light};
`;

export default () => {
  const { auth } = React.useContext(AuthContext);
  const [state, setState] = React.useState(null);
  const [nextPage, setNextPage] = React.useState(1);
  const [showAddTicket, setShowAddTicket] = React.useState(false);
  const { data, error, loading, called, fetchMore } = useQuery(
    api.credits.getTransactions,
    {
      fetchPolicy: "no-cache",
    },
  );
  const history = useHistory();

  const fetchMoreWeeshes = async ({ page }) =>
    await fetchMore({
      variables: {
        page,
      },
      updateQuery: (prev, { fetchMoreResult, ...rest }) => {
        return fetchMoreResult;
      },
    });

  const handlePaginate = () =>
    fetchMoreWeeshes({ page: nextPage }).then(res => {
      const result = res.data.getCreditsTransactionsForUser.transactions;
      setState(prevState => [...prevState, ...result]);
      setNextPage(res.data.getCreditsTransactionsForUser.paginate.nextPage);
    });

  React.useEffect(() => {
    if (called && data) {
      const result = data.getCreditsTransactionsForUser.transactions;
      setState(result);
      setNextPage(data.getCreditsTransactionsForUser.paginate.nextPage);
    }
  }, [data]);

  return (
    <StyledContainer>
      {state && state.length > 0 && (
        <Components.Global.InfiniteScroll
          onLoadMore={handlePaginate}
          hasNextPage={nextPage}
          padding="0 .6rem 3.125rem">
          {state.map(transaction => (
            <Transaction {...transaction} />
          ))}
        </Components.Global.InfiniteScroll>
      )}
      {loading ? (
        <Components.Global.Loading
          padding="3rem 0 0"
          size={28}
          strokeWidth={1.25}
          color="gray"
        />
      ) : (
        state &&
        state.length == 0 && (
          <StyledComponents.Title
            textAlign="center"
            padding="2rem 0"
            color="gray">
            {C.txts.en.credit.noTransactionsFound}
          </StyledComponents.Title>
        )
      )}
    </StyledContainer>
  );
};
