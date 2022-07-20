import React from "react";
import * as S from "./styles";
import { compactInteger } from "humanize-plus";

const Topic = React.memo(({ name, stargazerCount, onClick }) => (
  <S.Container onClick={() => onClick(name)}>
    <S.Title>{name}</S.Title>
    <S.Title>{compactInteger(stargazerCount, 1)} Stars</S.Title>
  </S.Container>
));

export default Topic;
