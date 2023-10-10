import { useEffect, useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setName(data.name));
  }, []);

  return <main>Hello {name}</main>;
}
