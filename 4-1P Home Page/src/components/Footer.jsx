import { Container, Grid, Header, List, Segment, Icon } from 'semantic-ui-react';

export default function Footer() {
  return (
    <Segment vertical style={{ background: '#4a9b9b', color: '#fff', padding: '60px 0 20px' }}>
      <Container>
        <Grid stackable columns={3}>
          <Grid.Column>
            <Header inverted as="h3">Explore</Header>
            <List link inverted>
              <List.Item as="a">Home</List.Item>
              <List.Item as="a">Questions</List.Item>
              <List.Item as="a">Articles</List.Item>
              <List.Item as="a">Tutorials</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column>
            <Header inverted as="h3">Support</Header>
            <List link inverted>
              <List.Item as="a">FAQs</List.Item>
              <List.Item as="a">Help</List.Item>
              <List.Item as="a">Contact Us</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column>
            <Header inverted as="h3">Stay connected</Header>
            <List horizontal link inverted>
              <List.Item as="a">
                <Icon name="facebook f" size="big" />
              </List.Item>
              <List.Item as="a">
                <Icon name="twitter" size="big" />
              </List.Item>
              <List.Item as="a">
                <Icon name="instagram" size="big" />
              </List.Item>
            </List>
          </Grid.Column>
        </Grid>
        <Segment basic textAlign="center" style={{ marginTop: 40, color: '#d1f0f0' }}>
          DEVDeakin 2022 · Privacy Policy · Terms · Code of Conduct
        </Segment>
      </Container>
    </Segment>
  );
}
