export default function Track({ params }: { params: { id: number } }) {
  return (
    <h1>Track - {params.id}</h1>
  )
}