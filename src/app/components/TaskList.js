'use client';
import 
// TaskList 組件：負責渲染任務列表
// 參數 tasks：接收任務陣列作為 props
export default function TaskList({ tasks, onDelete}) {
    return (
        // ul 容器: space-y-2 表示列表項目之間的垂直間距為2個單位
        <ul className="space-y-2">
            {/* 使用 map 方法遍歷任務陣列，為每個任務創建列表項目 */}
            {tasks.map((task, index) => (
                // li 項目樣式: 
                // border 添加邊框
                // p-2 內部padding為2個單位
                // rounded 添加圓角邊框
                <li 
                    key={task.id} 
                    className="border p-2 rounded flex justify-between items-center">
                    <Link
                        href={`/task/${task.id}`}
                        className="text-blue-600 hover:underline"
                    >
                        {task.title}
                    </Link>
                    <button className="text-red-500" onClick={() => onDelete(index)}>
                        Delete
                    </button>
                </li>    
            ))}
        </ul>
    )
}