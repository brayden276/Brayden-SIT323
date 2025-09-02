import { useState } from 'react';
import { collection, doc, getDocs, query, setDoc, where, serverTimestamp, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { hashPasswordToHex, normalizeEmail } from '../utils/security';
import { saveCurrentUserToStorage } from '../utils/session';
import { Container, Segment, Header, Form, Button, Message } from 'semantic-ui-react';

export default function Signup({ onLogin }) {
  const nav = useNavigate();
  const [form, set] = useState({ first: '', last: '', email: '', password: '' });
  const [err, setE] = useState('');

  const onChange = (e) => set({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setE('');
    try {
      const first = form.first.trim();
      const last = form.last.trim();
      const email = normalizeEmail(form.email);
      const pwd = form.password;

      if (!first || !last) {
        setE('Please provide your first and last name.');
        return;
      }
      if (pwd.length < 8) {
        setE('Password must be at least 8 characters.');
        return;
      }

      const usersCol = collection(db, 'users');
      const existsSnap = await getDocs(query(usersCol, where('email', '==', email), limit(1)));
      if (!existsSnap.empty) {
        setE('An account with this email already exists.');
        return;
      }

      const passwordHash = await hashPasswordToHex(pwd);

      const userId = crypto.randomUUID();
      const userDocRef = doc(usersCol, userId);
      await setDoc(userDocRef, {
        id: userId,
        firstName: first,
        firstname: first,
        lastName: last,
        lastname: last,
        email,
        passwordHash,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Auto sign-in (client session) for a smooth flow
      const sessionUser = {
        id: userId,
        email,
        firstName: first,
        lastName: last
      };
      saveCurrentUserToStorage(sessionUser);
      if (onLogin) await onLogin(sessionUser);
      nav('/');
    } catch (ex) {
      setE(ex.message || 'Sign up failed');
    }
  };

  return (
    <Container text style={{ maxWidth: 520, marginTop: 40 }}>
      <Segment raised>
        <Header as="h2" textAlign="center">Create your account</Header>
        <Form onSubmit={submit}>
          <Form.Group widths="equal">
            <Form.Input label="First name" name="first" placeholder="First name" onChange={onChange} required />
            <Form.Input label="Last name" name="last" placeholder="Last name" onChange={onChange} required />
          </Form.Group>
          <Form.Input label="Email" name="email" placeholder="Email" type="email" onChange={onChange} required />
          <Form.Input label="Password" name="password" placeholder="Password" type="password" onChange={onChange} required />
          {err && <Message negative size="small" content={err} />}
          <Button primary fluid type="submit">Create account</Button>
        </Form>
        <div style={{ marginTop: 10, textAlign: 'center' }}>
          <span>Already registered? </span><Link to="/login">Log in</Link>
        </div>
      </Segment>
    </Container>
  );
}
