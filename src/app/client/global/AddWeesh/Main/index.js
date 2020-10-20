import React from "react";
import styled from "styled-components";
import { WeeshContext } from "Root/contexts/weesh";
import C from "Root/constants";
import Editor from "draft-js-plugins-editor";
import { EditorState, ContentState, Modifier, SelectionState } from "draft-js";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import api from "Root/api";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import helpers from "Root/helpers";
import Child from "./Child";

const StyledContainer = styled.div`
  & * {
    color: ${({ theme }) => theme.colors.foreground};
  }
  background: ${({ theme }) => theme.colors.background};
  margin: 0.75rem;
`;

const StyledPrimary = styled.span`
  & * {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default props => {
  const { weesh, dispatch } = React.useContext(WeeshContext);
  const [initComponent, setInitComponent] = React.useState(true);
  const [reWeesh, setReWeesh] = React.useState(null);

  const MENTION_REGEX = /@[\w]+/g;
  const HASHTAG_REGEX = /#[\w\u0590-\u05ff]+/g;

  const mentionStrategy = (contentBlock, callback, contentState) => {
    findWithRegex(MENTION_REGEX, contentBlock, callback);
  };

  const hashtagStrategy = (contentBlock, callback, contentState) => {
    findWithRegex(HASHTAG_REGEX, contentBlock, callback);
  };

  const findWithRegex = (regex, contentBlock, callback) => {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index;
      callback(start, start + matchArr[0].length);
    }
  };

  const linkifyPlugin = createLinkifyPlugin({
    component: linkProps => <StyledPrimary>{linkProps.children}</StyledPrimary>,
  });

  const plugins = [linkifyPlugin];

  const decorators = [
    {
      strategy: mentionStrategy,
      component: mentionProps => (
        <StyledPrimary data-offset-key={mentionProps.offsetKey}>
          {mentionProps.children}
        </StyledPrimary>
      ),
    },
    {
      strategy: hashtagStrategy,
      component: hashtagProps => (
        <StyledPrimary data-offset-key={hashtagProps.offsetKey}>
          {hashtagProps.children}
        </StyledPrimary>
      ),
    },
  ];

  const initText = "" + weesh.content;

  const [state, setState] = React.useState({
    editorState: EditorState.createWithContent(
      ContentState.createFromText(initText),
    ),
  });

  const getWeeshResponse = useQuery(api.weeshes.getWeeshByLink, {
    fetchPolicy: "no-cache",
    variables: {
      link: helpers.queryString.get({ props, key: "childId" }),
    },
  });

  const [getTheBestTags, getTheBestTagsResponse] = useLazyQuery(
    api.tags.getTheBestTags,
    {
      fetchPolicy: "no-cache",
    },
  );

  const [getTagSuggestion, getTagSuggestionResponse] = useLazyQuery(
    api.tags.suggestion,
    {
      fetchPolicy: "no-cache",
    },
  );

  const [getUserSuggestion, getUserSuggestionResponse] = useLazyQuery(
    api.users.suggestion,
    {
      fetchPolicy: "no-cache",
    },
  );

  React.useEffect(() => {
    if (weesh.defaultSuggestions.length < 1) {
      getTheBestTags();
    }
  }, [weesh.defaultSuggestions]);

  React.useEffect(() => {
    const { data } = getWeeshResponse;
    if (data) {
      setReWeesh(data.getWeeshByLinkForUser);
      dispatch({
        type: "ADD_WEESH",
        data: {
          childId: data.getWeeshByLinkForUser.id,
        },
      });
    }
  }, [getWeeshResponse.data]);

  React.useEffect(() => {
    const { data } = getTheBestTagsResponse;
    if (data && weesh.allowShowSuggestions) {
      dispatch({
        type: "ADD_WEESH",
        data: {
          defaultSuggestions: data.getTheBestTagsForUser
            ? data.getTheBestTagsForUser.tags
            : [],
          store: {
            state,
            setState,
          },
        },
      });
    }
  }, [getTheBestTagsResponse.data]);

  React.useEffect(() => {
    const { data } = getTagSuggestionResponse;
    if (data && weesh.allowShowSuggestions) {
      dispatch({
        type: "ADD_WEESH",
        data: {
          suggestions: data.exploreAllForUser
            ? data.exploreAllForUser.tag.tags
            : [],
          store: {
            state,
            setState,
          },
        },
      });
    }
  }, [getTagSuggestionResponse.data]);

  React.useEffect(() => {
    const { data } = getUserSuggestionResponse;
    if (data && weesh.allowShowSuggestions) {
      dispatch({
        type: "ADD_WEESH",
        data: {
          suggestions: data.exploreAllForUser
            ? data.exploreAllForUser.user.users
            : [],
          store: {
            state,
            setState,
          },
        },
      });
    }
  }, [getUserSuggestionResponse.data]);

  const handleChange = editorState => {
    if (initComponent) {
      const selection = editorState.getSelection();
      const anchorKey = state.editorState
        .getCurrentContent()
        .getFirstBlock()
        .getKey();
      const forceSelection = selection.merge({
        anchorOffset: 0,
        focusOffset: 0,
        anchorKey,
        focusKey: anchorKey,
      });
      setState({
        editorState: EditorState.forceSelection(editorState, forceSelection),
      });
      setInitComponent(false);
    } else {
      setState({ editorState });
    }

    handleCursorPosition(editorState);
    dispatch({
      type: "ADD_CONTENT",
      data: {
        content: editorState.getCurrentContent().getPlainText(""),
      },
    });
  };

  const handleCursorPosition = editorState => {
    let selectionState = editorState.getSelection();
    let anchorKey = selectionState.getAnchorKey();
    let currentContent = editorState.getCurrentContent();
    let currentContentBlock = currentContent.getBlockForKey(anchorKey);
    let start = selectionState.getStartOffset();
    let text = currentContentBlock.getText().slice(0, start).split(" ");
    let expression = text[text.length - 1];
    if (expression.match(C.regexes.weesh.hashtag)) {
      getTagSuggestion({
        variables: {
          expression: `${expression.substr(1)}`,
        },
      });
      dispatch({
        type: "ADD_SUGGESTION",
        data: {
          allowShowSuggestions: true,
          suggestionType: "TAG",
        },
      });
    } else if (expression.match(C.regexes.weesh.mention)) {
      getUserSuggestion({
        variables: {
          expression: `${expression.substr(1)}`,
        },
      });
      dispatch({
        type: "ADD_SUGGESTION",
        data: {
          allowShowSuggestions: true,
          suggestionType: "USER",
        },
      });
    } else {
      dispatch({
        type: "EMPTY_SUGGESTION",
      });
    }
  };

  return (
    <StyledContainer>
      <Editor
        decorators={decorators}
        editorState={state.editorState}
        onChange={handleChange}
        plugins={plugins}
      />
      {reWeesh && <Child child={reWeesh} />}
    </StyledContainer>
  );
};
