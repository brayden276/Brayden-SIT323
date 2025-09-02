import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { hashPasswordToHex, normalizeEmail } from '../utils/security';
import { saveCurrentUserToStorage } from '../utils/session';
import { Container, Segment, Header, Form, Button, Message } from 'semantic-ui-react';

export default function Login({ onLogin }) {
  const nav = useNavigate();
  const [form, set] = useState({ email: '', password: '' });
  const [err, setE] = useState('');

  const onChange = (e) => set({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setE('');
    try {
      const email = normalizeEmail(form.email);
      const usersCol = collection(db, 'users');
      const snap = await getDocs(query(usersCol, where('email', '==', email), limit(1)));
      if (snap.empty) {
        setE('Invalid email or password');
        return;
      }

      const userDoc = snap.docs[0];
      const data = userDoc.data();
      const suppliedHash = await hashPasswordToHex(form.password);
      if (data.passwordHash !== suppliedHash) {
        setE('Invalid email or password');
        return;
      }

      // Always use the Firestore document id as the canonical id
      const sessionUser = {
        id: userDoc.id,
        email: data.email,
        firstName: data.firstName || data.firstname || '',
        lastName: data.lastName || data.lastname || ''
      };

      saveCurrentUserToStorage(sessionUser);
      if (onLogin) await onLogin(sessionUser);
      nav('/');
    } catch {
      setE('Login failed');
    }
  };

  return (
    <Container text style={{ maxWidth: 420, marginTop: 40 }}>
      <Segment raised>
        <Header as="h2" textAlign="center">Login</Header>
        <Form onSubmit={submit}>
          <Form.Input
            label="Email"
            name="email"
            placeholder="Email"
            type="email"
            onChange={onChange}
            required
          />
          <Form.Input
            label="Password"
            name="password"
            placeholder="Password"
            type="password"
            onChange={onChange}
            required
          />
          {err && <Message negative size="small" content={err} />}
          <Button primary fluid type="submit">Log in</Button>
        </Form>
        <div style={{ marginTop: 10, textAlign: 'center' }}>
          <span>No account? </span><Link to="/signup">Sign up</Link>
        </div>
      </Segment>
    </Container>
  );
}
