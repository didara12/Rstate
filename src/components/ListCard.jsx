import Card from "./Card";


export default function ListCard({data}) {
  return (
    <div className="d-flex flex-wrap ">
        
            {data && data.map(item => <Card key={item.id} item={item} />)}
        
    </div>
  )
}
 