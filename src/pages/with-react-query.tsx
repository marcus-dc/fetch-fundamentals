import { useQuery } from '@tanstack/react-query';

export default function WithReactQueryPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['name'],
    queryFn: async () => {
      const response = await fetch('/api/hello');
      if (!response.ok) throw new Error('Nag error!');
      return response.json();
    },
  });

  if (isLoading) return <div>NAG LOLOAD PA MAGANTAY KA</div>;

  return <div>Hello from {data?.name}</div>;
}
