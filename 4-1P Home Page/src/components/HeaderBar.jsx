import { Container, Menu, Input, Button } from 'semantic-ui-react';

export default function HeaderBar() {
  return (
    <Menu borderless stackable>
      <Container>
        <Menu.Item header>DEVDeakin</Menu.Item>
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Button basic>Post</Button>
          </Menu.Item>
          <Menu.Item>
            <Button basic>Login</Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}
