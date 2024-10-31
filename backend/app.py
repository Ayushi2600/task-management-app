from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

tasks = [] 

# Get all tasks (API endpoints)
@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

# Add a new task
@app.route('/tasks', methods=['POST'])
def add_task():
    task = request.get_json()
    task['id'] = len(tasks) + 1
    tasks.append(task)
    return jsonify(task), 201

# Update a task
@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task_data = request.get_json()
    task = next((t for t in tasks if t['id'] == task_id), None)
    if task:
        task.update(task_data)
        return jsonify(task)
    else:
        return jsonify({'error': 'Task not found'}), 404

# Delete a task
@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    tasks = [t for t in tasks if t['id'] != task_id]
    return jsonify({'message': 'Task deleted'})

if __name__ == "__main__":
    app.run(port=5001)
