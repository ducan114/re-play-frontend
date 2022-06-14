import { useState } from 'react';
import useMountedState from '../../hooks/useMountedState';
import { useAPIContext } from '../../contexts/APIContext';
import Modal from '../Modal';
import toast from 'react-hot-toast';
import { Form, FormTitle, FormControl } from '../../styles/forms';
import { SuccessButton, DangerButton } from '../../styles/buttons';

export default function AddGenreModal({
  onBackdropClick,
  onSuccess,
  action,
  genre
}) {
  const {
    API: { Genre }
  } = useAPIContext();
  const [name, setName] = useState((genre && genre.name) || '');
  const [description, setDescription] = useState(
    (genre && genre.description) || ''
  );
  const [processing, setProcessing] = useMountedState(false);

  const handleSubmit = e => {
    if (processing) return;
    e.preventDefault();
    if (!name) return toast.error('Name is required');
    if (genre && name === genre.name && genre.description === description)
      return toast.error('There is nothing to update');
    setProcessing(true);
    toast.promise(
      (action === 'Create'
        ? Genre.create(name, description)
        : Genre.update(genre.name, name, description)
      ).finally(() => setProcessing(false)),
      {
        loading: `${action === 'Create' ? 'Creating' : 'Updating'} genre`,
        success: data => {
          if (onSuccess) onSuccess();
          return data.message;
        },
        error: `Failed to ${action.toLowerCase()} genre\nsPlease check your connections`
      },
      { id: `${action} genre` }
    );
  };

  return (
    <Modal onBackdropClick={onBackdropClick}>
      <Form onSubmit={handleSubmit} pd='.5em'>
        <FormTitle fs='1.25rem' m='0'>
          New genre
        </FormTitle>
        <label htmlFor='name'>Name</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          id='name'
          type='text'
        />
        <label htmlFor='description' data-for-textarea>
          Description
        </label>
        <textarea
          name='description'
          id='description'
          value={description}
          onChange={e => setDescription(e.target.value)}
        ></textarea>
        <FormControl sticky>
          <DangerButton
            onClick={onBackdropClick}
            disabled={processing}
            type='button'
            whileHover={{ scale: processing ? 1 : 1.05 }}
            whileTap={{ scale: processing ? 1 : 0.95 }}
            shadow
          >
            Close
          </DangerButton>
          <SuccessButton
            disabled={processing}
            type='submit'
            whileHover={{ scale: processing ? 1 : 1.05 }}
            whileTap={{ scale: processing ? 1 : 0.95 }}
            shadow
          >
            {action}
          </SuccessButton>
        </FormControl>
      </Form>
    </Modal>
  );
}
