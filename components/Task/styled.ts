import React from 'react'
import styled from 'styled-components/native'

export const TitleTask = styled.Text`
  font-size: 1em;
  font-weight: bold;

  color: black;
`;
interface StatusProps {
  status: 'pending' | 'progress' | 'done'
};

export const Status = styled.View<StatusProps>`
  width: 12px;
  height: 12px;
  
  border: 2px solid #55BCF6;
  border-radius: 5px;

  background-color: ${({ status }) => 
    status === 'pending' 
    ? 'red' 
    : status === 'done' 
    ? 'green' 
    : 'blue'
  };
`;  