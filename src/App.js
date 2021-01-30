// import { render } from '@testing-library/react';
import React, { Component } from 'react';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import './App.css';

// class Subject extends Component {
//   render() {
//     return (
//       <header>
//         <h1>{this.props.title}</h1>
//         {this.props.sub}
//       </header>
//     );
//   }
// }

// class TOC extends Component {
//   render() {
//     return (
//       <nav>
//         <ul>
//           <li><a href="1.html">HTML</a></li>
//           <li><a href="2.html">CSS</a></li>
//           <li><a href="3.html">JavaScript</a></li>
//         </ul>
//       </nav>
//     );
//   }
// }

// class Content extends Component {
//   render() {
//     return (
//       <article>
//         <h2>{this.props.title}</h2>
//         {this.props.desc}
//       </article>
//     );
//   }
// }

class App extends Component { //자바스크립트와 유사
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      // mode: 'read',
      // mode: 'create',
      mode: 'welcome',
      selected_content_id: 2,
      subject: { title: 'WEB', sub: 'world wide web!' },
      welcome: { title: 'Welcome', desc: 'Hello, React!!' },
      contents: [
        { id: 1, title: 'HTML', desc: '안뇽' },
        { id: 2, title: 'CSS', desc: '하이' },
        { id: 3, title: 'JavaScript', desc: '에베베베' }
      ]
    }
  }
  getReadContent(){
    var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          return data;
          break;
        }
        // _title = this.state.contents[0].title;
        // _desc = this.state.contents[0].desc;
        i = i + 1;
      }
  }
  getContent() {
    var _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
      // var i = 0;
      // while (i < this.state.contents.length) {
      //   var data = this.state.contents[i];
      //   if (data.id === this.state.selected_content_id) {
      //     _title = data.title;
      //     _desc = data.desc;
      //     break;
      //   }
        // _title = this.state.contents[0].title;
        // _desc = this.state.contents[0].desc;
      //   i = i + 1;
      // }
      // _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function (_title, _desc) {
        // add content to this.state.contents
        this.max_content_id = this.max_content_id + 1;
        // this.state.contents.push(      //var a = 1,2 a.push(3) -> a = 1,2,3 // 원본 수정
        // {id:this.max_content_id, title:_title, desc:_desc}
        // );
        // this.setState({
        //   contents:this.state.contents
        // });


        // var a = 1,2 a.concat(3) -> a = 1,2
        // var a = 1,2 var b = a.concat(3) -> a = 1,2  b = 1,2,3
        var _contents = Array.from(this.state.contents);
        _contents.push({ id: this.max_content_id, title: _title, desc: _desc });
        this.setState({
          contents: _contents,
          mode:'read',
          selected_content_id: this.max_content_id
        });
        // var _contents = this.state.contents.concat( // 이 방법이 더 쉬움 // 복제본 수정
        //   { id: this.max_content_id, title: _title, desc: _desc }
        // );
        // this.setState({
        //   contents: _contents
        // });


        // var a = 1,2  var b = Array.from(a) -> a = 1,2   b = 1,2
        // var a = 1,2  var b = Array.from(a)  a===b -> a = 1,2   b = 1,2  false
        // var a = 1,2  var b = Array.from(a)  b.push(3)  a===b -> a = 1,2   b = 1,2,3  false
        // var newContents = Array.from(this.state.contents);
        // newContents.push({id:this.max_content_id, title:_title, desc:_desc});
        // this.setState({
        //   contents: newContents
        // });


        // var a = {name:'egoing'} var b = Object.assign({}, a) a===b  
        // -> a = {name:'egoing'}  b = {name:'egoing'} false
        // var a = {name:'egoing'} var b = Object.assign({}, a) b.name = 'leezche'  a===b  
        // -> a = {name:'egoing'}  b = {name:'leezche'} false
        // var a = {name:'egoing'} var b = Object.assign({left:1 , right:2}, a) b.name = 'leezche'  a===b  
        // -> a = {name:'egoing'}  b = {left:1 , right:2 , name:'leezche'} false



        // var a = Immutable.Map{a:1, b:2, c:3} var b = a.set('b', 50) a.set('b') b.set('b')  ->  2  ,  50


        console.log(_title, _desc);
      }.bind(this)}></CreateContent>
    } else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function (_id, _title, _desc) {
        //// add content to this.state.contents
        // this.max_content_id = this.max_content_id + 1;
        var _contents = Array.from(this.state.contents);
        // var _contents = this.state.contents.concat( // 이 방법이 더 쉬움 // 복제본 수정
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );
        var i = 0;
        while(i < _contents.length){
          if(_contents[i].id === _id){
            _contents[i] = {id:_id, title:_title, desc:_desc};
            break;
          }
          i = i + 1;
        }  
        this.setState({
          contents: _contents,
          mode:'read'
        });
        console.log(_title, _desc);
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  render() {
    console.log('App render');
    return (
      <div className="App">
        {/* <header>
          <h1><a href="/" onClick={function(e){
            console.log(e);
            e.preventDefault(); // 페이지 전환이 안되게 해주는 것
            // debugger; 여기서 멈추는 것
            // this.state.mode = 'welcome'; 오류 
            this.setState({  // read에서 welcome으로 전환
              mode: 'welcome'
            });
          }.bind(this)}>{this.state.subject.title}</a></h1>
          {this.state.subject.sub}
        </header> */}
        <Subject title={this.state.subject.title} sub={this.state.subject.sub}
          onChangePage={function () {
            // alert('하이이이이');
            this.setState({ mode: 'welcome' });
          }.bind(this)}
        >
        </Subject>
        {/* <Subject title="React" sub="For UI"></Subject> */}
        <TOC onChangePage={function (id) {
          // alert('하이!!');
          this.setState({
            mode: 'read',
            // selected_content_id: id // 문자
            selected_content_id: Number(id) // 문자를 숫자로 강제 변경해주는 것
          });
        }.bind(this)} data={this.state.contents}></TOC>
        {/* <Content title="HTML" desc="HTML is HyperText Markup Language."></Content> */}
        <Control onChangeMode={function (_mode) {
          if(_mode === 'delete'){
            if(window.confirm('진짜 삭제할거임?')){
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while(i < _contents.length){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i, 1);
                  break;
                }
                i = i + 1;
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              });
              alert('삭제되었습니다.');
            }
          } else {
            this.setState({
              mode: _mode
            });
          }  
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
} //컴포넌트 만드는 것
export default App;
