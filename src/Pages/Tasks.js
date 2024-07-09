import React, { useState, useEffect } from 'react';
import Footer from '../Component/Footer';
import './Spinner.css';
import { addUserTasks, getUserTasks, updateHomeBalance, getUserFromHome } from '../utils/firestoreFunctions';
import './bg.css';

const Tasks = () => {
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState("12345"); // Replace with dynamic ID if possible
  const [taskFilter, setTaskFilter] = useState('new'); // 'new' or 'completed'
  const [loadingTask, setLoadingTask] = useState(null); // New state for loading status
  const [claimableTasks, setClaimableTasks] = useState({}); // State to track claimable tasks
  const [homeBalance, setHomeBalance] = useState(0); // State to track home balance

  window.Telegram.WebApp.expand();

  const tasks = [
    { id: 1, title: 'Invite 5 Friends', reward: 15000, link: "https://youtube.com" },
    { id: 2, title: 'Complete Profile', reward: 5000, link: "https://example.com" },
    { id: 3, title: 'Join Community', reward: 10000, link: "https://example.com" },
    // Add more tasks as needed
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserTasks(userId);
        if (data) {
          setUserData(data);
          if (data.taskFilter) {
            setTaskFilter(data.taskFilter);
          }
        } else {
          const initialData = {
            taskFilter: 'new',
            TasksClaim: {},
            TasksComplete: {},
            TasksStatus: []
          };
          await addUserTasks(userId, initialData);
          setUserData(initialData);
        }

        const homeData = await getUserFromHome(userId);
        if (homeData && homeData.homeBalance !== undefined) {
          setHomeBalance(homeData.homeBalance);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const saveUserData = async () => {
      if (userId && userData) {
        try {
          await addUserTasks(userId, userData);
        } catch (error) {
          console.error('Error saving data:', error);
        }
      }
    };

    const handleBeforeUnload = (e) => {
      saveUserData();
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    const saveInterval = setInterval(saveUserData, 10000); // Save user data every 10 seconds

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(saveInterval);
      saveUserData();
    };
  }, [userId, userData]);

  useEffect(() => {
    if (userData) {
      const updatedData = { ...userData, taskFilter };
      setUserData(updatedData);
    }
  }, [taskFilter]);

  const handleStartClick = (taskId, taskLink) => {
    setLoadingTask(taskId);
    setTimeout(() => {
      setLoadingTask(null);
      setClaimableTasks(prevState => ({ ...prevState, [taskId]: true }));
      window.location.href = taskLink;
    }, 10000);
  };

  const handleClaimClick = async (taskId, reward) => {
    try {
      const updatedTasksClaim = { ...userData.TasksClaim, [taskId]: true };
      const updatedTasksComplete = { ...userData.TasksComplete, [taskId]: true };
      const updatedTasksStatus = [...userData.TasksStatus, { id: taskId, status: 'completed' }];

      const updatedUserData = { 
        ...userData, 
        TasksClaim: updatedTasksClaim, 
        TasksComplete: updatedTasksComplete, 
        TasksStatus: updatedTasksStatus 
      };
      setUserData(updatedUserData);

      const newBalance = homeBalance + reward;
      setHomeBalance(newBalance);
      await updateHomeBalance(userId, newBalance);

      setTaskFilter('completed');
      setClaimableTasks(prevState => ({ ...prevState, [taskId]: false }));
    } catch (error) {
      console.error('Error claiming task:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (taskFilter === 'new') {
      return !userData?.TasksComplete?.[task.id];
    }
    if (taskFilter === 'completed') {
      return userData?.TasksComplete?.[task.id];
    }
    return false;
  });

  return (
    <div className=" bg-cover min-h-screen flex flex-col">
      <div className="flex-grow overflow-y-auto bg-cover text-center text-white p-4">
        <h1 className="text-2xl font-bold">Complete the mission,<br /> earn the commission!</h1>
        <p className="text-zinc-500 mt-2">But hey, only qualified actions unlock the <br /> LAR galaxy! ✨</p>
        <div className="flex justify-center w-full mt-4">
          <button 
            className={`py-2 text-center text-sm w-full rounded-2xl ${taskFilter === 'new' ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-400'}`}
            onClick={() => setTaskFilter('new')}
          > 
            New
          </button>
          <button 
            className={`py-2 text-center text-sm w-full rounded-2xl ${taskFilter === 'completed' ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-400'}`}
            onClick={() => setTaskFilter('completed')}
          >
            Completed
          </button>
        </div>
        <div className="mt-6 space-y-4">
          {filteredTasks.length === 0 && taskFilter === 'completed' && (
            <div>No completed tasks yet.</div>
          )}
          {filteredTasks.map((task) => (
            <div key={task.id} className="bg-zinc-800 p-4 rounded-xl flex justify-between items-center">
              <div>
                <p className="font-semibold">{task.title}</p>
                <p className="text-golden-moon">{task.reward.toLocaleString()} LAR</p>
              </div>
              <div className="flex items-center space-x-2">
                {claimableTasks[task.id] ? (
                  <button 
                    onClick={() => handleClaimClick(task.id, task.reward)} 
                    className="bg-golden-moon text-white py-2 px-4 rounded-xl"
                  >
                    Claim
                  </button>
                ) : (
                  <button 
                    onClick={() => handleStartClick(task.id, task.link)} 
                    className="bg-golden-moon text-white py-2 px-4 rounded-xl"
                  >
                    {loadingTask === task.id ? (
                      <div className="spinner-border spinner-border-sm"></div>
                    ) : (
                      'Start'
                    )}
                  </button>
                )}
                <a href={task.link} target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground py-2 px-4 text-golden-moon rounded-lg">
                  Go
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-md sticky bottom-0 left-0 flex text-white bg-zinc-900 justify-around py-1">
        <Footer />
      </div>
    </div>
  );
};

export default Tasks;
