import React, { Component } from 'react'
import FormComponent from './FormComponent'
import ListComponent from './ListComponent'



export default class UserPage extends Component {
  render() {
    return (
      <div>
        <h2 className='text-center mt-3'>Form exam</h2>
        <FormComponent/>
        <ListComponent/>
      </div>
    )
  }
}
