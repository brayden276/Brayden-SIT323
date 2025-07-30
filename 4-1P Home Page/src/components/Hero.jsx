import { Container, Segment } from 'semantic-ui-react';

export default function Hero() {
  return (
    <Container style={{ marginTop: 30 }}>
      <Segment
        basic
        inverted
        style={{
          height: 300,
          border: '2px solid #333',
          overflow: 'hidden',
          padding: 0,
        }}
      >
        <img
          src="https://placehold.co/600x400"
          alt="Mountain lake reflection"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Segment>
    </Container>
  );
}
