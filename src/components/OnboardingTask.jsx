import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit2,FiPlus } from 'react-icons/fi';
import { HiOutlineTemplate } from 'react-icons/hi';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskModal from './TaskModal';


const OnboardingTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);


  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/tasks/onboarding');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };


  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);

    const updatedTasks = items.map((task, index) => ({
      id: task.id,
      new_order_number: index + 1
    }));

    try {
      await axios.put('http://localhost:3001/api/tasks/onboarding/order', { tasks: updatedTasks });
    } catch (error) {
      console.error('Error updating task order:', error);
      fetchTasks(); 
    }
  };

  
  const handleNewTaskSubmit = async (newTask) => {
    try {
      await axios.post('http://localhost:3001/api/tasks/onboarding/create', {
        task_name: newTask.task_name,
        description: newTask.template, 
        // due_days: newTask.due_date, 
      });
      fetchTasks(); 
      setIsTaskModalOpen(false);
    } catch (error) {
      console.error('Error creating new task:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Workflow</h1>
          <p className="text-gray-600 mt-1">Onboarding tasks management</p>
        </div>
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center transition duration-150 ease-in-out"
          onClick={() => setIsTaskModalOpen(true)}
        >
          <FiPlus className="mr-2" />
          <span>New Task</span>
        </button>
      </div>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden" {...provided.droppableProps} ref={provided.innerRef}>
              <thead className="bg-gray-50">
                <tr className="text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Task Name</th>
                  <th className="py-3 px-6 text-left">Template</th>
                  <th className="py-3 px-6 text-left">Due Date</th>
                  <th className="py-3 px-6 text-center">Edit</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                    {(provided, snapshot) => (
                      <tr 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`border-b border-gray-200 hover:bg-gray-100 ${snapshot.isDragging ? 'bg-blue-50' : ''}`}
                      >
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          {index + 1}. {task.task_name}
                        </td>
                        <td className="py-3 px-6 text-left">
                          <button className="text-gray-500 hover:text-gray-700" title={task.description}>
                            <HiOutlineTemplate size={20} />
                          </button>
                        </td>
                        <td className="py-3 px-6 text-left">2 days</td>
                        <td className="py-3 px-6 text-center">
                          <button className="text-blue-500 hover:text-blue-700">
                            <FiEdit2 size={18} />
                          </button>
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>

      <TaskModal
        isOpen={isTaskModalOpen}
        closeModal={() => setIsTaskModalOpen(false)}
        onSubmit={handleNewTaskSubmit}
      />
    </div>
  );
};

export default OnboardingTasks;