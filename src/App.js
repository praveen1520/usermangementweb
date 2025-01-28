import UserList from "./components/UserList"
import AddForm from "./components/AddForm"
import UpdateForm from "./components/UpdateForm"
import {Route, Routes } from "react-router-dom"
import NotFound from "./components/NotFound"
const App=()=>{
  //Implenation of Routing in React
  return (
      <Routes>
        <Route exact path="/" element={ <UserList />} />
        <Route exact path="/AddForm" element={<AddForm />} />
        <Route exact path="/updateForm/:id" element={<UpdateForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
  )
}
export default App