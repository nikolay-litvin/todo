import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from "../item-add-form";

import './app.css'

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Cofee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a launch')
        ],
        term: ''
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
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

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        // and then add the element to array
        this.setState(({todoData}) => {

            const newArr = [
                ...todoData,
                newItem
            ];
            return {
                todoData: newArr
            }
        });
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

        // 1. create new object from old with change `done` state
        const oldItem = arr[idx];
        const newItem = {...oldItem,
            [propName]: !oldItem[propName]};

        // 2. construct new array
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];

    }

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    };

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        });
    };

    search(items, term) {
        if (term.length === 0)
            return items;

        return items.filter((item) => {
            return item.label
                .toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    }

    onSearchChange = (term) => {
        this.setState({term});
    }





    render() {
        const { todoData, term } = this.state;

        const visibleItems = this.search(todoData, term);

        const doneCount = todoData
                          .filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={ todoCount } done={ doneCount } />
                <div className="top-panel d-flex">
                    <SearchPanel
                    onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter />
                </div>

                <TodoList
                    todos={visibleItems}
                    onDeleted={ this.deleteItem }
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm addItem={this.addItem} />
            </div>
        );
    }
};
