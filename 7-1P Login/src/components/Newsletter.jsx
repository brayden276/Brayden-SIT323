import { Container, Form, Header, Segment, Button } from 'semantic-ui-react';

export default function Newsletter() {
  return (
    <Segment vertical style={{ background: '#f0f0f0', padding: '40px 0' }}>
      <Container textAlign="center">
        <Header as="h3">SIGN UP FOR OUR DAILY INSIDER</Header>
        <Form style={{ maxWidth: 400, margin: '0 auto' }}>
          <Form.Input placeholder="Enter your email" type="email" />
          <Button primary fluid>
            Subscribe
          </Button>
        </Form>
      </Container>
    </Segment>
  );
}
