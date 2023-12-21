import { useLoadTodoMutation } from './todoApiSlice'
import { useEffect, useState } from "react"
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Container, FormControl, FormLabel, Modal, ModalBody, ModalHeader } from "react-bootstrap"
import TodoListItem from './TodoListItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { selectCurrentUser } from '../auth/authSlice'
import { useSelector } from 'react-redux'
import { useCreateTodoMutation } from './todoApiSlice'

const Todo = () => {
    const [pendingTodo, setPendingTodo] = useState([])
    const [finishTodo, setFinishTodo] = useState([])
    const [loadTodo, {isLoading} ] = useLoadTodoMutation()
    const user = useSelector(selectCurrentUser)
    const [createModal, setCreateModal] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [createTodo] = useCreateTodoMutation();
    const [searchTodo, setSearchTodo] = useState('')

    const handleLoadTodo =  async () => {
        await loadTodo({user_id: user.id})
            .unwrap()
            .then((payload) => {
                setPendingTodo(payload.pending)
                setFinishTodo(payload.finish)
            })
            .catch((error) => console.error(error))
    }

    const handleCreateTodo = async () => {
        await createTodo({
            title: title,
            description: description,
            user_id: user.id
        }).unwrap()
        handleLoadTodo()
        setCreateModal(false)
    }

    const filteredTodo = pendingTodo.filter(
        item => {
            return (
                item.title.toLowerCase().includes(searchTodo.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTodo.toLowerCase())
            )
        }
    )

    useEffect(() => {
        handleLoadTodo()
    },[])

    const content = isLoading ? <h1>Loading..</h1> : (
        <section>
            <Container className='todoContainer'>
                <Card style={{width: '35rem'}}> 
                    <CardHeader className='bg-white text-center'>
                        <CardTitle>Things TO DO BEFORE . . </CardTitle>
                    </CardHeader>
                    <CardBody>
                        
                        <div className='mb-2 d-flex justify-content-between'>
                            <Button variant='success' size='sm' onClick={() => setCreateModal(true)}><FontAwesomeIcon icon="plus" /></Button>
                            <FormControl placeholder='Search' style={{width: '15rem'}} onChange={(e) => setSearchTodo(e.target.value)}></FormControl>
                        </div>
                        <TodoListItem pendingTodo={filteredTodo} finishTodo={finishTodo} loadTodo={handleLoadTodo} />
                    </CardBody>
                    <CardFooter className='d-flex justify-content-between'>
                        <span style={{fontSize: '.7em'}}>Active: {filteredTodo.length}</span>
                        <span style={{fontSize: '.7em'}}>Completed: {finishTodo.length}</span>
                    </CardFooter>
                </Card>
                <Modal show={createModal} onHide={() => setCreateModal(false)}>
                    <ModalHeader>Create Todo</ModalHeader>
                    <ModalBody>
                        <div className='mb-3'>
                            <FormLabel>Title:</FormLabel>
                            <FormControl onChange={(e) => setTitle(e.target.value)}></FormControl>
                        </div>
                        <div className='mb-3'>
                            <FormLabel>Description:</FormLabel>
                            <FormControl onChange={(e) => setDescription(e.target.value)}></FormControl>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <Button className='me-2' variant='success' size='sm' onClick={handleCreateTodo}>Create</Button>
                            <Button variant='danger' size='sm' onClick={() => setCreateModal(false)}>Cancel</Button>
                        </div>
                    </ModalBody>
                </Modal>
            </Container>
        </section>
        
    )
        
    return content
}

export default Todo