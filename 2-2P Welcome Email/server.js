require('dotenv').config();
const express    = require('express');
const path       = require('path');
const sgMail     = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log({ apiKey: process.env.SENDGRID_API_KEY, from: process.env.FROM_EMAIL });

const app = express();
app.use(express.json());
app.use('/css',   express.static(path.join(__dirname, 'public/css')));
app.use('/images',express.static(path.join(__dirname, 'public/images')));

app.post('/subscribe', async (req, res) => {
  const { email, name } = req.body;
  console.log('POST /subscribe hit with body:', req.body);
  if (!email) return res.status(400).json({ error: 'Email required' });

  const msg = {
    to:      email,
    from:    process.env.FROM_EMAIL,
    subject: 'Welcome to DEV@Deakin!',
    html:    `<p>Hey ${name||'there'},</p>
              <p>Thanks for joining DEV@Deakin. Dive in and enjoy!</p>`
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'Welcome email sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Email failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
