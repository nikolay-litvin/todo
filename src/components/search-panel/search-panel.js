import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
    state = {
        term: ''
    };

    onSearchChange = (e) => {
      const term = e.target.value; // получаем текущее значение input
      this.setState({term}); // обновление своего же состояния
      this.props.onSearchChange(term); // на каждое нажатие вызываем onSearchChange
    };

    render() {
        return (
            <input type="text"
                   className="form-control search-input"
                   placeholder="type to search"
                   value={this.state.term}
                   onChange={this.onSearchChange}/>
        );
    }
}

