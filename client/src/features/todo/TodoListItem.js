import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, FormControl, FormLabel, ListGroup, ListGroupItem, Modal, ModalBody } from "react-bootstrap"
import { setUpdateTodoCredentials } from "./todoSlice"
import { useUpdateFinishTodoMutation, useGetOneTodoMutation, useUpdateTodoDataMutation, useDeleteTodoDataMutation } from "./todoApiSlice"
import { useDispatch } from "react-redux"
import { useState } from "react"

const TodoListItem = ({pendingTodo, finishTodo, loadTodo}) => {
    const [updateFinish, setUpdateFininsh] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [updateDelete, setUpdateDelete] = useState(false)
    const [todoId, setTodoId] = useState(0)

    const [editTitle, setEditTitle] = useState('')
    const [editDescription, setEditDescription] = useState('')

    const [updateFinishTodo, { isLoading }] = useUpdateFinishTodoMutation()
    const [getOneTodo] = useGetOneTodoMutation()
    const [updateTodoData] = useUpdateTodoDataMutation()
    const [deleteTodoData] = useDeleteTodoDataMutation()

    const dispatch = useDispatch()
    //FUNCTIONS
    const handleFinish = async () => {
        try{
            const updateData =  await updateFinishTodo({id: todoId})
                    .unwrap()
                    .then(() => {
                        loadTodo()
                    })
             dispatch(setUpdateTodoCredentials({...updateData, todoId})) 
             setTodoId(0)
        }catch(err) {
            console.error(err)
        }
    }
    const handleUpdateTodoData = async () => {
        try{
            const updatedData = await updateTodoData({
                id: todoId,
                title: editTitle,
                description: editDescription
            }).unwrap()
            console.log(updatedData)
            loadTodo()
            setEditModal(false)
            setTodoId(0)
        }catch(err){
            console.error(err)
        }
    }   
    const handleUpdateDelete = async () => {
        try{
            await deleteTodoData({id: todoId}).unwrap()
            loadTodo()
            setUpdateDelete(false)
            setTodoId(0)
        }catch(err){
            console.error(err)
        }
    }
    // END FUNCTIONS

    //MODALS
    const handlShowUpdateFinish = (id) => {
        setTodoId(id)
        setUpdateFininsh(true)
    }
    const handlShowEditModal = async (id) => {
        setTodoId(id)
        try{
            const populateEditField = await getOneTodo({id}).unwrap()
            setEditTitle(populateEditField.title)
            setEditDescription(populateEditField.description)
        }catch(err){
            console.error(err)
        }
        setEditModal(true)
    }
    const handlShowUpdateDelete = (id) => {
        setTodoId(id)
        setUpdateDelete(true)
    }

    return (
        <div>
            {isLoading ? <h1>LOADING. . .</h1> : (
            <ListGroup>
                {pendingTodo.map((item) => (
                    <ListGroupItem key={item.id} variant="primary">
                        <div className="d-flex justify-content-between">
                            <Button variant="success" size="sm" style={{fontSize: '.7em'}} onClick={() => handlShowUpdateFinish(item.id)} ><FontAwesomeIcon icon="check" /></Button>
                            {item.title}
                            <div>
                                <Button variant="primary" className="me-2" size="sm" style={{fontSize: '.7em'}} onClick={() => handlShowEditModal(item.id)}><FontAwesomeIcon icon="pencil" /></Button>
                                <Button variant="danger" size="sm" style={{fontSize: '.7em'}} onClick={() => handlShowUpdateDelete(item.id)} ><FontAwesomeIcon icon="trash" /></Button>
                            </div>
                        </div>
                    </ListGroupItem>
                ))}
                <ListGroupItem variant="success" className="text-center">Completed</ListGroupItem>
                {finishTodo.map((item) => (
                    <ListGroupItem key={item.id} variant="danger">{item.title}</ListGroupItem>
                ))}
            </ListGroup>
           
            )}
             <Modal show={updateFinish} onHide={() => setUpdateFininsh(false)}>
                    <ModalBody>
                        <h5 className="text-center">Are you sure to tag as finish this todo?</h5>
                        <div className="d-flex justify-content-end">
                            <Button variant="success" size="sm" className="me-2" onClick={handleFinish}>Ok! Proceed.</Button>
                            <Button variant="danger" size="sm" onClick={() => setUpdateFininsh(false)}>Cancel</Button>
                        </div>
                    </ModalBody>
             </Modal>
             <Modal show={editModal} onHide={() => setEditModal(false)}>
                    <ModalBody>
                        <div className="mb-3">
                            <FormLabel>Title:</FormLabel>
                            <FormControl value={editTitle} onChange={(e) => setEditTitle(e.target.value)}></FormControl>
                        </div>
                        <div className="mb-3">
                            <FormLabel>Description:</FormLabel>
                            <FormControl value={editDescription} onChange={(e) => setEditDescription(e.target.value)}></FormControl>
                        </div>
                        <div className="d-flex justify-content-end">
                            <Button variant="success" size="sm" className="me-2" onClick={handleUpdateTodoData}>Ok! Proceed.</Button>
                            <Button variant="danger" size="sm" onClick={() => setEditModal(false)}>Cancel</Button>
                        </div>
                    </ModalBody>
             </Modal>
             <Modal show={updateDelete} onHide={() => setUpdateDelete(false)}>
                    <ModalBody>
                        <h5 className="text-center">Are you sure to delete this todo??</h5>
                        <div className="d-flex justify-content-end">
                            <Button variant="success" size="sm" className="me-2" onClick={handleUpdateDelete}>Ok! Proceed.</Button>
                            <Button variant="danger" size="sm" onClick={() => setUpdateDelete(false)}>Cancel</Button>
                        </div>
                    </ModalBody>
             </Modal>
        </div>
    )

}

export default TodoListItem