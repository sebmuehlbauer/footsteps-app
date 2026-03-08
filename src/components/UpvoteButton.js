import React from 'react';
import { Button, message } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const UPVOTE_PATH = gql`
  mutation UpvotePath($pathId: Int!, $userId: String!) {
    update_learning_path_by_pk(pk_columns: {id: $pathId}, _append: {voted_by: [ $userId ]}) {
      id
      voted_by
    }
  }
`;

const UpvoteButton = ({ pathId, userId, votedBy = [] }) => {
  const [upvote] = useMutation(UPVOTE_PATH);

  const handleUpvote = async () => {
    if (votedBy.includes(userId)) {
      message.info('You have already upvoted this path!');
      return;
    }
    try {
      await upvote({ variables: { pathId, userId } });
      message.success('Upvoted successfully!');
    } catch (err) {
      message.error('Failed to upvote');
    }
  };

  return (
    <Button icon={<LikeOutlined />} onClick={handleUpvote}>
      {votedBy.length} Upvotes
    </Button>
  );
};

export default UpvoteButton;