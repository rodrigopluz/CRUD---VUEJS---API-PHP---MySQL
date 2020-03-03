<?php

$conn = new mysqli('localhost', 'root', 'symee@2018', 'api_vuejs');

if ($conn->connect_error) {
    die('Erro, Falha na conexão com o banco de dados.');
}

$res = ['error' => false];
$action = 'read';

if (isset($_GET['action'])) {
    $action = $_GET['action'];
}

// read
if ($action == 'read') {
    $result = $conn->query("SELECT * FROM tasks");
    $tasks = [];

    while ($row = $result->fetch_assoc()) {
        array_push($tasks, $row);
    }

    $res['tasks'] = $tasks;
}

// create
if ($action == 'create') {
    $user = $_POST['user'];
    $task = $_POST['task'];
    $date = $_POST['date'];

    $result = $conn->query("INSERT INTO tasks (user, task, date) VALUES('$user', '$task', '$date')");

    if ($result) {
        $res['message'] = 'Tarefa adicionada com sucesso';
    } else {
        $res['error'] = true;
        $res['message'] = 'insert task fail';
    }
}

// update
if ($action == 'update') {
    $id = $_POST['id'];
    $user = $_POST['user'];
    $task = $_POST['task'];
    $date = $_POST['date'];

    $result = $conn->query("UPDATE tasks SET user = '$user', task = '$task', date = '$date' WHERE id = '$id'");

    if ($result) {
        $res['message'] = 'Tarefa atualizada com sucesso';
    } else {
        $res['error'] = true;
        $res['message'] = 'update task fail';
    }
}

// delete
if ($action == 'delete') {
    $id = $_POST['id'];
    $user = $_POST['user'];
    $task = $_POST['task'];
    $date = $_POST['date'];

    $result = $conn->query("DELETE FROM tasks WHERE id = '$id'");

    if ($result) {
        $res['message'] = 'Tarefa deletada com sucesso';
    } else {
        $res['error'] = true;
        $res['message'] = 'delete task fail';
    }
}

$conn->close();
header("Content-type: application/json");
echo json_encode($res);
exit;
