import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #eee;
  border: 1px solid #999;
  border-radius: 5px;
`;

export const Main = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Children = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 0;
`;

export const Content = styled.div`
  flex: 1 0 auto;
`;

export const ContentStatic = styled.div`
  color: #777;
  text-align: left;
`;

export const ContentEditable = styled.input`
  width: 90%;
`;

export const Actions = styled.div`
  flex: 0 0 auto;
`;
