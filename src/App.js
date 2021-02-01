import './App.css';

import React, {Component} from 'react';
import {Item} from "./components/Item";

//https://www.reddit.com/r/reactjs.json?limit=100
export class App extends Component {
    constructor() {
        super();

        this.state = {
            items: [],
            isLoading: false,
            enableAutoRefresh: false,
            minComment:0
        };
    }

    componentDidMount() {
        this.getItems();
    }

    getItems = () => {
        this.setState({
            isLoading: true
        })
        fetch('https://www.reddit.com/r/reactjs.json?limit=100')
            .then(response => response.json())
            .then(({data}) => {
                this.setState({
                    items: data.children,
                    isLoading: false
                });
            });
    };
    updateAutoRefresh = () => {
        this.setState(state => ({
            enableAutoRefresh: !state.enableAutoRefresh
        }), () => {
            if (this.state.enableAutoRefresh) {
                this.autoRefresh = setInterval(this.getItems, 3000)
            } else {
                clearInterval(this.autoRefresh);
            }
        })
    };
    updateMinComment=event=>{
        this.setState({
            minComment:Number(event.target.value)
        })
    }
getItemsByComments=(items,minComment)=>
    items
    .filter(item=>item.data.num_comments >=minComment)
    .sort((a, b) => b.data.num_comments - a.data.num_comments);

    render() {
        const {items, isLoading, enableAutoRefresh,minComment} = this.state;
        const itemsSornByComments = this.getItemsByComments(items,minComment)
        return (
            <div>
                <h1>Top commented</h1>
                <div>
<p>Current filter: {minComment}</p>
                    <button
                        type="button"
                        style={{marginBottom: '15px'}}
                        onClick={this.updateAutoRefresh}
                    >
                        {enableAutoRefresh ? 'Stop' : 'Start'} auto-refresh
                    </button>
                </div>

                <input
                    type="range"
                    value={minComment}
                    onChange={this.updateMinComment}
                    min={0}
                    max={500}
                    style={{width:'100%'}}
                />

                {isLoading ? (
                    <p>...Loading</p>
                ) : (
                    itemsSornByComments.map(item => <Item key={item.data.id} data={item.data}/>)
                )}
            </div>
        );
    }
}


