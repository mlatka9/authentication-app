import ChatPost from '../ChatPost/ChatPost';
import ChatInput from '../ChatInput/ChatInput';
import styled from 'styled-components';
import { Routes, Route, useParams } from 'react-router-dom';
import { useEffect, useLayoutEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import ContentLoader, { Facebook } from 'react-content-loader';
import { useTheme } from 'styled-components';

const PostLoader = (props) => (
  <ContentLoader
    speed={2}
    height={120}
    width={'100%'}
    viewBox="0 0 800 100"
    backgroundColor="orange"
    // foregroundColor=""
    // width={`100%`}
    {...props}
  >
    <rect x="55" y="27" rx="3" ry="3" width="100%" height="50" />
    <circle cx="25" cy="23" r="20" />
    <rect x="71" y="145" rx="0" ry="0" width="1" height="0" />
    <rect x="136" y="101" rx="0" ry="0" width="1" height="0" />
    <rect x="56" y="10" rx="0" ry="0" width="35%" height="10" />
    <rect x="102" y="10" rx="0" ry="0" width="20" height="10" />
  </ContentLoader>
);

const Wrapper = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* padding: 0 70px; */
  /* z-index: -10; */
`;

const StyledHeader = styled.header`
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 70px;
  margin-bottom: 50px;
  background-color: ${({ theme }) => theme.color.grey800};
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2);
  @media (max-width: 800px) {
    /* height: calc(100vh - 100px - 120px); */
    margin-bottom: 25px;
  }

  /* position: relative; */
  /* &:after {
    content: '';
    position: absolute;
    width: 100%;
    bottom: 1px;
    left: 0;
    z-index: -1;
    background-color: red;
    box-shadow: 0px 0px 8px 3px rgba(0, 0, 0, 0.2);
  } */
  h2 {
    color: ${({ theme }) => theme.color.grey200};
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.fontSize.l};
    font-weight: ${({ theme }) => theme.fontWeight.bolder};
  }
`;

const ChatPostsWrapper = styled.div`
  /* 100% viewport height - 60px header - 120px input wapper */
  height: calc(100vh - 220px);
  overflow-y: scroll;
  @media (max-width: 800px) {
    height: calc(100vh - 180px);
  }
`;

const ChatSection = () => {
  const theme = useTheme();
  console.log(theme);
  const { joinedChannel } = useOutletContext();
  const channel = useSelector((state) => state.channel[joinedChannel]);
  const posts = useSelector((state) => state.post);
  const postEndRef = useRef(null);
  const params = useParams();

  useEffect(() => {
    if (postEndRef.current) {
      postEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [posts]);

  useEffect(() => {
    if (postEndRef.current) {
      postEndRef.current.scrollIntoView();
    }
  }, [joinedChannel]);

  if (!joinedChannel || joinedChannel !== params.id) {
    return (
      <Wrapper>
        <StyledHeader />
        {/* <PostLoader backgroundColor={theme.color.grey500} />
        <PostLoader backgroundColor={theme.color.grey500} />
        <PostLoader backgroundColor={theme.color.grey500} />
        <PostLoader backgroundColor={theme.color.grey500} />
        <PostLoader backgroundColor={theme.color.grey500} /> */}
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <StyledHeader>
        <h2>{channel.name}</h2>
      </StyledHeader>
      <ChatPostsWrapper>
        {posts.map((post) => (
          <ChatPost key={post.id} post={post} />
        ))}

        <div ref={postEndRef} />
      </ChatPostsWrapper>
      <ChatInput channelId={joinedChannel} />
    </Wrapper>
  );
};

export default ChatSection;