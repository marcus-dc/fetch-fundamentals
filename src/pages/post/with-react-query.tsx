import { useMutation } from '@tanstack/react-query';

export default function PostWithReactQueryPage() {
  const { mutate, data, isLoading } = useMutation({
    mutationFn: async (rawData: Record<string, string>) => {
      const response = await fetch('/api/hello', {
        method: 'POST',
        body: JSON.stringify(rawData),
      });

      if (!response.ok) throw new Error('Nag error!');

      const fromServer = JSON.parse(await response.json());

      return {
        firstName: fromServer.firstName,
        lastName: fromServer.lastName,
      };
    },
  });

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();

        const formData = new FormData(evt.currentTarget);
        const entries = formData.entries();
        const rawData = Object.fromEntries(entries) as Record<string, string>;

        mutate(rawData);
      }}
    >
      <input type="text" name="firstName" />
      <input type="text" name="lastName" />
      <button type="submit">Save</button>

      {isLoading && <div>NAG LOLOAD</div>}

      <table>
        <tr>
          <td>firstName</td>
          <td>{data?.firstName}</td>
        </tr>
        <tr>
          <td>lastName</td>
          <td>{data?.lastName}</td>
        </tr>
      </table>
    </form>
  );
}
