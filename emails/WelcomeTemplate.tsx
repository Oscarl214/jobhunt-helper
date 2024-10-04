import React, { CSSProperties } from 'react';
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Tailwind,
  Preview,
} from '@react-email/components';
const WelcomeTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Preview>Welcome Aboard</Preview>
      <Tailwind>
        <Body className="bg-white">
          <Container>
            <Text className="text-xl font-bold">Hello {name}</Text>
            <Link href="https://www.osworld.dev/">os Portfolio</Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const body: CSSProperties = {
  background: '#ghfdkl',
};

export default WelcomeTemplate;
