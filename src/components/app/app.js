import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

import './app.css'

export default class App extends Component {
    state = {
        todoData: [
            { label: 'Drink Coffee', important: false, id: 1 },
            { label: 'Make Awesome App', important: true, id: 2 },
            { label: 'Have a lunch', important: false, id: 3 }
        ]

    };

    deleteItem = (id) => {

        this.setState(({ todoData }) => {
           const idx = todoData.findIndex((el) => el.id === id);

           // todoDate.splice(idx, 1);
           // НЕЛЬЗЯ! Нельзя изменять существующий state, ведь
           // splice меняет существующий массив

           // берем все эелементы до удаленного элемента
           // потом все элементы после удаленного
           // slice не изменяет существующий массив (важно!)
           // конструируем новый массив
           const newArray = [
               ...todoData.slice(0, idx),
               ...todoData.slice(idx + 1)
           ];

           return {
               todoData: newArray
           }
        });
    };

    render() {
        return (
            <div className="todo-app">
                <AppHeader toDo={1} done={3} />
                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>

                <TodoList
                    todos={this.state.todoData}
                    onDeleted={ this.deleteItem }/>
            </div>
        );
    }
};
