import React, { useState, useEffect } from 'react'
import { Button, List, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const TextArea = () => {
  let [data, setData] = useState([])
  let [ listElements, setListElements ] = useState([])
  const [toggle, setToggle] = useState(false)
  let arr = []

  let [ firstStandup, setFirstStandup ] = useState(["Enter your first standup content"])
  let [ secondStandup, setSecondStandup ] = useState(["Enter your second standup content"])
  let [ thirdStandup, setThirdStandup ] = useState(["Enter your third standup content"])

  const removeItem = (index) => {
    setListElements(data.filter((_, i) => i !== index ));
  } 
  const updateData = (event) => {
    console.log(event.target.value)
    setData([event.target.value])

    console.log("data:", data)
    console.log("listElements:", listElements)
  }

  useEffect(() => {
    arr += data
    setListElements([...listElements, arr])
    console.log("listElements:", listElements)
    console.log("listElements:", listElements.length)
    setToggle(false)
  }, [toggle])

  return (
    <>
    <textarea
      onChange={updateData}
      value={data}
    >
    </textarea>
    <Button onClick={() => setToggle(!toggle)}><Icon name="add" ></Icon> Save</Button>
   </>
  )
}


const CustomList = ({ data, itemIndex, removeItem, submitData }) => (
  <List.Item style={{ minHeight: '50px' }}>
    <List.Content floated='right'>
      <List.Icon onClick={() => removeItem(itemIndex)} size="big" name="delete" />
    </List.Content>
      <List.Icon size="big"  name="arrow circle right" />
      {/* Might have to reiterate this bit. 
      We could maybe usd a div and show text area on click*/}
    <List.Content> 
      <div className="contentEditableDiv">
        {/* {data} */}
        <TextArea />
      </div>
    </List.Content>
  </List.Item>
)
function InputListComponent({data, firstStandup, secondStandup, thirdStandup}) {
  let [ listElements, setListElements ] = useState([firstStandup, secondStandup, thirdStandup])
  const removeItem = (index) => {
    setListElements(listElements.filter((_, i) => i !== index ));
  } 

  return(
    <>
    <List divided verticalAlign='middle'>
      {listElements.map((elem, i) => (
        <CustomList key={i} data={elem} itemIndex={i} removeItem={(i) => removeItem(i)}/>
      ))}
    </List>
   <Button onClick={() => setListElements([...listElements, ''])}><Icon name="add" ></Icon> Add</Button>
   </>
  )
}

export default InputListComponent;