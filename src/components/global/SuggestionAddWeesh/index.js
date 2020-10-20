import React from "react";
import { EditorState, ContentState, Modifier, SelectionState } from "draft-js";
import styled, { css } from "styled-components";
import C from "Root/constants";
import { WeeshContext } from "Root/contexts/weesh";
import uuid from "uuid";
import StyledComponents, { Components } from "Root/StyledComponents";
import helpers from "Root/helpers";

const StyledContainer = styled.div`
  ${C.styles.flex.flexRow};
  ${C.styles.scrollbar.hide};
  width: ${({ width }) => width || "unset"};
  padding: 0.5rem;
  background: ${({ theme }) => theme.colors.background};
  overflow-x: scroll;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.light};
`;

const StyledBlock = styled.div`
  ${C.styles.flex.inlineFlexRow};
  ${C.styles.flex.alignItemsCenter};
  padding: 0 0.5rem 0 0;
`;

const StyledItem = styled.span`
  ${C.styles.flex.inlineFlexRow};
  ${C.styles.flex.alignItemsCenter};
  width: ${({ width }) => width || "unset"};
  background: ${({ theme }) => theme.colors.background};
  overflow-x: scroll;
  border: 1px solid ${({ theme }) => theme.colors.light};
  ${({ padding }) => css`
    padding: ${padding};
  `};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 0.5rem;
  &:hover {
    background: ${({ theme }) => theme.colors.lightPrimary};
    border: 1px solid ${({ theme }) => theme.colors.lightPrimary};
    transition: all 0.2s ease;
  }
  cursor: pointer;
`;

const StyledContent = styled.span`
  ${C.styles.flex.inlineFlexColumn};
  padding: 0 0 0 0.25rem;
`;

const StyledTag = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  padding: 0 0.25rem 0.2rem 0;
  font-size: 0.95rem;
`;

const StyledNumber = styled.span`
  color: ${({ theme }) => theme.colors.gray};
  font-weight: normal;
  white-space: nowrap;
  font-size: 0.7rem;
  padding: 0 0.25rem 0 0;
`;

const StyledUserTitle = styled.span`
  color: ${({ theme }) => theme.colors.dark};
  font-weight: normal;
  font-size: 0.7rem;
`;

export default props => {
  const { weesh, dispatch } = React.useContext(WeeshContext);

  const getSearchText = (editorState, selection) => {
    const anchorKey = selection.getAnchorKey();
    const anchorOffset = selection.getAnchorOffset() - 1;
    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(anchorKey);
    const blockText = currentBlock.getText();

    return getWordAt(blockText, anchorOffset);
  };

  const getWordAt = (string, position) => {
    // Perform type conversions.
    const str = String(string);
    // eslint-disable-next-line no-bitwise
    const pos = Number(position) >>> 0;

    // Search for the word's beginning and end.
    const left = str.slice(0, pos + 1).search(/\S+$/);
    const right = str.slice(pos).search(/\s/);

    // The last word in the string is a special case.
    if (right < 0) {
      return {
        word: str.slice(left),
        begin: left,
        end: str.length,
      };
    }

    // Return the word, using the located bounds to extract it from the string.
    return {
      word: str.slice(left, right + pos),
      begin: left,
      end: right + pos,
    };
  };

  const handleClick = value => {
    const { state, setState } = weesh.store;
    const selection = state.editorState.getSelection();

    const { begin, end } = getSearchText(state.editorState, selection);

    const newSelectionState = selection.merge({
      anchorOffset: begin,
      focusOffset: end,
    });

    const contentState = state.editorState.getCurrentContent();

    const mentionReplacedContent = Modifier.replaceText(
      contentState,
      newSelectionState,
      value,
    );
    const newEditorState = EditorState.push(
      state.editorState,
      mentionReplacedContent,
      "insert-mention",
    );
    const forceSelection = selection.merge({
      anchorOffset: begin + value.length,
      focusOffset: begin + value.length,
    });

    setState({
      editorState: EditorState.forceSelection(newEditorState, forceSelection),
    });

    dispatch({
      type: "ADD_CONTENT",
      data: {
        content: newEditorState.getCurrentContent().getPlainText(),
      },
    });
  };

  return (
    <StyledContainer width={props.width || undefined}>
      {weesh.suggestions.length > 0 && (
        <>
          {weesh.suggestionType == "USER" &&
            weesh.suggestions.map(user => (
              <UserItem {...user} handleClick={handleClick} />
            ))}
          {weesh.suggestionType == "TAG" &&
            weesh.suggestions.map(tag => (
              <TagItem {...tag} handleClick={handleClick} />
            ))}
        </>
      )}
      {weesh.suggestions.length < 1 &&
        weesh.defaultSuggestions.length > 0 &&
        weesh.defaultSuggestions.map(tag => (
          <div style={{ padding: "1.25rem" }}></div> // <TagItem {...tag} handleClick={handleClick} />
        ))}
      {weesh.suggestions.length < 1 && weesh.defaultSuggestions.length < 1 && (
        <Components.Global.Loading padding=".65rem" />
      )}
    </StyledContainer>
  );
};

const TagItem = props => {
  return (
    <StyledBlock onClick={() => props.handleClick(`#${props.title}`)}>
      <StyledItem padding=".3rem">
        <StyledContent>
          <StyledTag>#{props.title}</StyledTag>
          <StyledNumber>
            {helpers.labelFormat({
              single: "weesh",
              plural: "weeshes",
              number: props.weeshCounter || props.counter,
            })}
          </StyledNumber>
        </StyledContent>
      </StyledItem>
    </StyledBlock>
  );
};

const UserItem = props => {
  return (
    <StyledBlock onClick={() => props.handleClick(`@${props.username}`)}>
      <StyledItem padding=".25rem .5rem">
        <Components.Global.Avatar user={props} size={1.5} />
        <StyledContent>
          <Components.Global.FullName user={props} fontSize={0.85} />
          <StyledUserTitle>@{props.username}</StyledUserTitle>
        </StyledContent>
      </StyledItem>
    </StyledBlock>
  );
};
