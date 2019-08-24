import React from 'react';
import Typography from '@material-ui/core/Typography';

import Section, { SectionTitle, SectionBody, SectionSubtitle } from './Section';

const Welcome = () => (
  <Section>
    <SectionTitle>Welcome</SectionTitle>

    <SectionBody>
      This screen (DASH) is used for authorization and global application
      settings. Use the tabs at the bottom of the page to view the other
      screens. The Expeditor (EXPO) screen is used for viewing and interacting
      with tickets. The Point of Sale (POS) screen is used for adding tickets to
      the system.
    </SectionBody>
  </Section>
);

const Admin = () => (
  <Section>
    <SectionTitle>Authorization</SectionTitle>

    <SectionSubtitle>Change login status</SectionSubtitle>

    <Typography component="p" variant="body2">
      (Authorization system has yet to be implemented.)
    </Typography>
  </Section>
);

const Settings = () => (
  <Section>
    <SectionTitle>Settings</SectionTitle>

    <SectionSubtitle>Adjust global application settings</SectionSubtitle>

    <Typography component="p" variant="body2">
      (Settings have yet to be implemented.)
    </Typography>
  </Section>
);

export default () => (
  <>
    <Welcome />
    <Admin />
    <Settings />
  </>
);
