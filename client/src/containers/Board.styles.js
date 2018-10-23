import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  align-items: flex-start;
  width: 100%;
  padding: 20px;
  overflow-x: auto;

  > div {
    width: 300px;
    margin-right: 10px;
  }
`;
