import React, { Component } from 'react';

class TOC extends Component {
    // 1. render 이전에 shouldComponentUpdate가 실행된다
    // 2. shouldComponentUpdate의 리턴값이 true이면 render 함수가 호출되고,
    // false이면 호출되지 않는다.
    // 3. shouldComponentUpdate의 새롭게 바뀐 값과 이전의 값을 확인 할 수 있다.
    shouldComponentUpdate(newProps, newState){
        console.log('===>TOC render  shouldComponentUpdate'
        ,newProps.data, this,this.props.data
        );
        if(this.props.data === newProps.data){
            return false;
        }
        return true;
    }
    render() {
        console.log('===>TOC render');
        var lists = [];
        var data = this.props.data;
        var i = 0;
        while (i < data.length) {
            lists.push(
                <li key={data[i].id}>
                    <a href={"/Content/" + data[i].id}
                        data-id={data[i].id}
                        onClick={function (e) {
                            e.preventDefault();
                            this.props.onChangePage(e.target.dataset.id);
                        }.bind(this)}
                    >{data[i].title}</a>
                </li>);
            i = i + 1;
        }
        // while (i < data.length) {
        //     lists.push(
        //         <li key={data[i].id}>
        //             <a href={"/Content/" + data[i].id}
        //                 onClick={function (id, e) {
        //                     e.preventDefault();
        //                     this.props.onChangePage(id);
        //                 }.bind(this, data[i].id)}
        //             >{data[i].title}</a>
        //         </li>);
        //     i = i + 1;
        // }
        return (
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        );
    }
}

export default TOC;