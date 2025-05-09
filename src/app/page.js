'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";

// 主頁面組件
export default function Home() 
{
  // 定義狀態變數
  const [tasks, setTasks] = useState([]); // 儲存所有任務的陣列
  const [newTask, setNewTask] = useState(''); // 儲存新任務的輸入值
  const [nextId, setNextId] = useState('1'); 

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
    const maxId = savedTasks.reduce((max, task) => Math.max(max, task.id), 0);
    setNextId(maxId + 1);
  }, []);

  // 新增任務的處理函數
  const addTask = () =>
  {
    console.log("Before:", tasks); // 紀錄新增前的任務列表
    console.log("NewTask:", newTask); // 紀錄要新增的任務

    const newTaskObj = {
      id: nextId,
      title: newTask,
      description: '',
    };
    const updatedTasks = [...tasks, newTaskObj]; // 使用展開運算符創建新的任務陣列
    setTasks(updatedTasks); // 更新任務列表
    console.log("After;", updatedTasks); // 紀錄新增後的任務列表
    setNewTask(''); // 清空輸入欄位

    setNextId(nextId + 1);
    localStorage.setItem('task', JSON.stringify(updatedTasks));
  };

  const handleDelete = (index) => {
    const newTask = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }
  // 渲染頁面UI
  return (
    // main 容器: p-4 表示內部padding為4個單位
    <main className="p-4 max-w-md mx-auto">
      {/* 標題樣式: text-2xl 表示文字大小為2xl, font-bold 表示字體粗體 */}
      <h1 className="text-2xl font-bold">Task Borad</h1>

      {/* 輸入區塊容器: flex 啟用flexbox佈局, gap-2 設定元素間距為2個單位, mb-4 下方margin為4個單位 */}
      <div className="flex gap-2 mb-4">
        <input
          // 輸入框樣式: border 添加邊框, p-2 內部padding為2個單位, flex-1 讓輸入框占據剩餘空間
          className="border p-2 flex-1"
          placeholder="Enter a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          // 按鈕樣式: bg-blue-500 藍色背景, text-white 白色文字, px-4 左右padding為4個單位
          className="bg-blue-500 text-white px-4"
          onClick={addTask}
        >
          Add
        </button>  
      </div>

      {/* 引入TaskList組件並傳入任務陣列作為props */}
      <TaskList tasks={tasks} onDelete={handleDelete} />

    </main>
  );
}
