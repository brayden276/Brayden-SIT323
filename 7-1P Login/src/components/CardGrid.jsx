import { Header, Card, Rating, Button, Container } from 'semantic-ui-react';

export default function CardGrid({ title, items }) {
  return (
    <section style={{ margin: '50px 0' }}>
      <Container>
        <Header as="h2" textAlign="center">
          {title}
        </Header>
        <Card.Group itemsPerRow={3} stackable>
          {items.map((c) => (
            <Card key={c.title}>
              <img src={c.img} alt={c.title} style={{ height: 150, objectFit: 'cover' }} />
              <Card.Content>
                <Card.Header>{c.title}</Card.Header>
                <Card.Description>{c.desc}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Rating
                  icon="star"
                  defaultRating={Math.round(c.stars)}
                  maxRating={5}
                  disabled
                />{' '}
                {c.stars.toFixed(1)} &nbsp;·&nbsp; {c.author}
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
        <Button basic fluid style={{ marginTop: 30 }}>
          See all {title.toLowerCase()}
        </Button>
      </Container>
    </section>
  );
}
