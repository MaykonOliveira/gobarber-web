import React from 'react';
import { Form } from '@unform/web';
import { useSelector, useDispatch } from 'react-redux';

import { updateProfileRequest } from '../../store/modules/user/actions';

import AvatarInput from './AvatarInput';
import Input from '../../components/Input';

import { Container } from './styles';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />
        <Input name="name" placeholder="Your full name" />
        <Input name="email" type="email" placeholder="Your e-mail address" />

        <hr />

        <Input name="oldPassword" placeholder="Your old password" />
        <Input name="password" placeholder="Your new password" />
        <Input name="confirmPassword" placeholder="Confirm your new password" />

        <button type="submit">Update profile</button>
      </Form>

      <button type="button">Logout</button>
    </Container>
  );
}
