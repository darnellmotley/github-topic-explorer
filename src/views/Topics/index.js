import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { useLazyQuery } from "@apollo/client";

import Topic from "../../components/Topic";
import { GET_TOPICS } from "../../graphql/queries";

const initialTopic = "react";

const Topics = () => {
  const [fetchTopics, { data }] = useLazyQuery(GET_TOPICS);
  const [history, setHistory] = useState([]);

  const fetchData = (name) => fetchTopics({ variables: { name } });

  const onTopicClick = (topic) => {
    if (!history.length) {
      setHistory([...history, initialTopic, topic]);
    } else {
      setHistory([...history, topic]);
    }
    fetchData(topic);
  };

  const goBack = () => {
    let historyCopy = [...history];
    let lastTopic = historyCopy.pop();

    if (lastTopic === data?.topic?.name) {
      lastTopic = historyCopy.pop();
    }
    if (lastTopic) {
      fetchData(lastTopic);
    }
    setHistory(historyCopy);
  };

  useEffect(() => {
    fetchData(initialTopic);
  }, []);

  return (
    <S.Container>
      <S.PageTitle>Github Topics</S.PageTitle>

      {!!history.length && (
        <S.BackButton onClick={goBack}>Go Back</S.BackButton>
      )}
      <S.TopicTitle>
        Title: <span>{data?.topic?.name}</span>
      </S.TopicTitle>

      {data?.topic?.relatedTopics?.map((item, index) => (
        <Topic
          key={index}
          name={item.name}
          stargazerCount={item.stargazerCount}
          onClick={onTopicClick}
        />
      ))}
    </S.Container>
  );
};

export default Topics;
