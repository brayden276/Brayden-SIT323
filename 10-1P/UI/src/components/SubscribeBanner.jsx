import { useState } from 'react';
import { Segment, Input, Button, Message } from 'semantic-ui-react';

export default function SubscribeBanner() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState({ loading: false, ok: false, err: '' });

  const onSubscribe = async (e) => {
    e.preventDefault();
    const trimmed = (email || '').trim().toLowerCase();
    if (!/.+@.+\..+/.test(trimmed)) {
      setState({ loading: false, ok: false, err: 'Please enter a valid email.' });
      return;
    }
    try {
      setState({ loading: true, ok: false, err: '' });
      const res = await fetch('/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || 'Subscription failed.');
      }
      setState({ loading: false, ok: true, err: '' });
      setEmail('');
    } catch (err) {
      setState({ loading: false, ok: false, err: err.message || 'Subscription failed.' });
    }
  };

  // Full-width banner (escapes centered #root)
  const bannerStyle = {
    background: '#f6f7f9',
    padding: '16px 0',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    width: '100vw',
    borderBottom: '1px solid #e5e7eb',
  };

  const innerStyle = {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  return (
    <Segment basic style={bannerStyle}>
      <form onSubmit={onSubscribe} style={innerStyle}>
        <span style={{ fontWeight: 600, fontSize: 16 }}>
          Sign up for our Daily Inside
        </span>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={state.loading}
          style={{ minWidth: 260 }}
          aria-label="Email address"
        />

        <Button
          primary
          type="submit"
          loading={state.loading}
          disabled={state.loading}
          aria-label="Subscribe"
        >
          Subscribe
        </Button>

        {state.ok && (
          <Message positive size="small" style={{ margin: 0 }}>
            <Message.Content>Subscribed. Check your inbox for the welcome email.</Message.Content>
          </Message>
        )}
        {state.err && (
          <Message negative size="small" style={{ margin: 0 }}>
            <Message.Content>{state.err}</Message.Content>
          </Message>
        )}
      </form>
    </Segment>
  );
}
