import { Container, Menu, Input, Button, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function HeaderBar({ profile, onLogout }) {
  const userName = profile ? `${profile.firstName || profile.firstname || ''} ${profile.lastName || profile.lastname || ''}`.trim() : '';

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

          {profile ? (
            <Menu.Item>
              <Dropdown text={userName || 'Account'} pointing="top left">
                <Dropdown.Menu>
                  <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          ) : (
            <Menu.Item as={Link} to="/login">
              <Button basic>Login</Button>
            </Menu.Item>
          )}

        </Menu.Menu>
      </Container>
    </Menu>
  );
}
