import React from 'react';
import {Container, Header, Button, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

import './Main.css'
const Main = () => {
  return (
    <Container text>
      <Header className="mainHeader" as='h1'
        content='Imagine-a-Task'
      />
      <Header className="secondHeader"
        as='h2'
        content='Do whatever you want when you want to.'
      />
      <Button primary size='huge'>
        <Link className="ctaLink" to="/signup">Get Started</Link>
        <Icon name='right arrow' />
      </Button>
  </Container>
  );
}

export default Main;
