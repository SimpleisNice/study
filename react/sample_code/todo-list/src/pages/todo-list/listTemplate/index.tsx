import { useContext } from 'react';

// context api
import { TitleContext } from 'src/contexts';

export default function ListTemplate() {

  return (
    <div>
      <ListTitle />
    </div>
  )
}

function ListTitle() {
  const title = useContext(TitleContext)
  return (<h1>{title}</h1>)
}