import React from 'react';
import { Link } from 'react-router-dom';

import Board from 'containers/Board';

const BoardPage = ({ match }) => (
  <React.Fragment>
    <p>
      <Link to='/'>Back to Boards</Link>
    </p>
    <Board id={match.params.id} />
  </React.Fragment>
);

export default BoardPage;
