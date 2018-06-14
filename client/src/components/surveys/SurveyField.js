// survey field contains logid to render a single label and text input
import React from 'react';

export default ({ input, label }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
    </div>
  )
}


//  {...input} === onBlur={input.onBlur} etc
