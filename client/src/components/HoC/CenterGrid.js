import React from 'react';
import {Grid} from 'semantic-ui-react';

const CenterGrid = (props) => {
  return(
    <Grid columns={2} centered doubling>
      <Grid.Row>
        <Grid.Column>
          {props.children}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default CenterGrid;
