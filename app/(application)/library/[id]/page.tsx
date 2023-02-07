interface Props {
  params: {
    id: number;
  };
}

export default function Track({ params }: Props) {
  return <h1>Track - {params.id}</h1>;
}
