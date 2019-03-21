/*
    THIS FILE IS DEPRECATED, DONT USE
*/

import * as React from 'react'
import * as ReactDOM from 'react-dom'

interface User{
  name: string;
}

class Eyes extends React.Component <{x: string, name: string}> {
  render() {
    let pos = this.props.x === '50' ? '50 -10 755 755' : '0 -10 755 755',
        style = { mask: 'url(#mask_Pad)' };

    return (
      <React.Fragment>
        <p className='h'>{this.props.name}</p>
        <p className='sm'> scale </p>

        <div id='sliderBox'>
          <svg width='100%' height='100%' viewBox={pos} preserveAspectRatio='none'>
            <path d='M301 765c-17 0-31-14-31-30V496c0-6-5-11-10-11H21c-17 0-31-14-31-30V21c0-17 14-31 31-31h714c16 0 30 14 30 31v714c0 16-14 30-30 30H301z' />
            <defs>
              <mask id='mask_Pad' x='0' y='0' width='1024' height='1024'>
                <path fill='#fff' d='M301 765c-17 0-31-14-31-30V496c0-6-5-11-10-11H21c-17 0-31-14-31-30V21c0-17 14-31 31-31h714c16 0 30 14 30 31v714c0 16-14 30-30 30H301z'/>
              </mask>
            </defs>
          
          </svg>
          <div id='X'  className='line'></div>
          <div id='X2' className='line'></div>
          <div id='Y'  className='line'></div>
          <div id='Y2' className='line'></div>
          <div id='Parall' className='line'></div>
          <div id='tapPoint' style={style}></div>
        </div>
        <p className='X'>       width <span id = 'number'> 100 </span></p>
        <p className='sm num'> height <span id = 'number'> 100 </span></p>
      </React.Fragment>
    )
  }
}

class MenuBar extends React.Component <User, {}> {
  render() {
    let content: any, set_Color: any, fav_Color: any;

    switch(this.props.name) {
      case('Mouth'): 
        set_Color = null
        fav_Color = null
        break
      default:
        set_Color = <i className='fa fa-tint'></i>
        fav_Color =<div id='favColor'></div>
    }

    switch(this.props.name) {
      case('Eyes'): 
        content = (
          <React.Fragment>
            <Eyes name='iris' x='0'/>,
            <Eyes name='pupils' x='50'/>
          </React.Fragment>
        ); break
      
      case('Mane'): 
        content = (
          <React.Fragment>
            <p className='h'> hair style </p>
            <p className='name'> Float </p>
            <div id='#menu_of_models'> change </div>
          </React.Fragment>
        ); break
  
      case('Fur'): 
        content = (
          <React.Fragment>
            <p className='h'> set color </p>
          </React.Fragment>
        ); break
      
      case('Mouth'): 
        content = (
          <React.Fragment>
            <p className='sm'> test </p>
            <input id='sliderY' type='range' min='10' max='100' value='100'/>
          </React.Fragment>
        ); break
    }

    return (
      <React.Fragment>
        {set_Color}
        <div id='title'>
          <p> {this.props.name} </p>
          <div className='mark-arrow'>
            {fav_Color}
            <i className='fa fa-caret-down'></i>
            <i className='fa fa-times'></i>
          </div>
        </div>
        {content}
      </React.Fragment>
    )
  }
}

let names = ['Eyes', 'Mane', 'Fur', 'Mouth'];

for(var i = 0; i < names.length; i++) {
  ReactDOM.render(<MenuBar name={names[i]}/>, document.getElementsByClassName('menu-bar')[i])
}