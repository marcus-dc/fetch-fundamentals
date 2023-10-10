import { FormEventHandler, useState } from 'react';

export default function PostWithFetchPage() {
  const [data, setData] = useState({ firstName: '', lastName: '' });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const entries = formData.entries();
    const rawData = Object.fromEntries(entries);

    const response = await fetch('/api/hello', {
      method: 'POST',
      body: JSON.stringify(rawData),
    });

    if (!response.ok) throw new Error('Nag error!');

    const fromServer = JSON.parse(await response.json());
    setData({
      firstName: fromServer.firstName,
      lastName: fromServer.lastName,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" />
      <input type="text" name="lastName" />
      <button type="submit">Save</button>

      <table>
        <tr>
          <td>firstName</td>
          <td>{data.firstName}</td>
        </tr>
        <tr>
          <td>lastName</td>
          <td>{data.lastName}</td>
        </tr>
      </table>
    </form>
  );
}
