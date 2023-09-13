import './my-sass.scss';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';

export default function (props) {
  return;
  <select value="Templates">
    <option value="none"> - </option>
    <option value="Template 1">Template 1</option>
    <option value="Template 2">Template 2</option>
    {props.array.map((id) => {
      return;
      <option value={id}>{id}</option>;
    })}
  </select>;
}
