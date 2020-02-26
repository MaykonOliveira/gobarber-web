import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import api from '../../../services/api';

import { Container } from './styles';

export default function AvatarInput({ name }) {
  const inputRef = useRef();
  const { registerField, defaultValue } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  useEffect(() => {
    if (inputRef.current) {
      registerField({
        name,
        ref: inputRef.current,
        path: 'dataset.file',
      });
    }
  }, [inputRef, name, registerField]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={
            preview || 'https://api.adorable.io/avatars/50/abott@adorable.png'
          }
          alt="src"
        />

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={inputRef}
        />
      </label>
    </Container>
  );
}

AvatarInput.propTypes = {
  name: PropTypes.string.isRequired,
};
