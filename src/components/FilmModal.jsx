import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useMountedState from '../hooks/useMountedState';
import { useAPIContext } from '../contexts/APIContext';
import Modal from './Modal';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { Form, FormTitle, FormControl } from '../styles/forms';
import { PrimaryButton, SuccessButton, DangerButton } from '../styles/buttons';

export default function FilmModal({
  onBackdropClick,
  onSuccess,
  action,
  film
}) {
  const {
    API: { Film }
  } = useAPIContext();
  const { slug } = useParams();
  const [poster, setPoster] = useState((film && film.poster) || null);
  const [title, setTitle] = useState((film && film.title) || '');
  const [description, setDescription] = useState(
    (film && film.description) || ''
  );
  const [posterLoading, setPosterLoading] = useState(true);
  const [processing, setProcessing] = useMountedState(false);
  const newFilmForm = useRef(null);
  const posterInputRef = useRef(null);

  const handleSubmit = e => {
    if (processing) return;
    e.preventDefault();
    if (!title) return toast.error('Title is required!');
    if (!poster) return toast.error('Poster image is required!');
    if (
      film &&
      title === film.title &&
      poster === film.poster &&
      description === film.description
    )
      return toast.error('There is nothing to update');
    const formData = new FormData(newFilmForm.current);
    if (action === 'Create' && !description) formData.delete('description');
    if (film && title === film.title) formData.delete('title');
    if (film && description === film.description)
      formData.delete('description');
    if (film && poster === film.poster) formData.delete('poster');
    setProcessing(true);
    toast.promise(
      (action === 'Create'
        ? Film.create(formData)
        : Film.update(slug, formData)
      ).finally(() => setProcessing(false)),
      {
        loading: `${action === 'Create' ? 'Creating' : 'Updating'} film`,
        success: data => {
          if (onSuccess) onSuccess(data.slug);
          return data.message;
        },
        error: `Failed to ${action.toLowerCase()} film\nPlease check your connections`
      }
    );
  };

  const onPosterSelect = e => {
    const file = e.target.files[0];
    if (file) setPoster(URL.createObjectURL(file));
  };

  return (
    <Modal onBackdropClick={onBackdropClick}>
      <Form onSubmit={handleSubmit} pd='.5em' ref={newFilmForm}>
        <FormTitle>{action} film</FormTitle>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          name='title'
          id='title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor='description' data-for-textarea>
          Description
        </label>
        <textarea
          type='text'
          name='description'
          id='description'
          value={description}
          onChange={e => setDescription(e.target.value)}
        ></textarea>
        <PrimaryButton
          as={motion.label}
          whileHover={{ scale: 1.0125 }}
          whileTap={{ scale: 0.9875 }}
          data-select-image
        >
          Select a poster image
          <input
            onChange={onPosterSelect}
            type='file'
            name='poster'
            accept='image/*'
            hidden
            ref={posterInputRef}
          />
        </PrimaryButton>
        <AnimatePresence>
          {poster && (
            <PosterPriviewer
              as={motion.img}
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: posterLoading ? 0 : 'auto',
                opacity: posterLoading ? 0 : 1
              }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 1
              }}
              src={poster}
              alt='poster-preview'
              onClick={() => {
                setPoster(null);
                setPosterLoading(true);
                posterInputRef.current.value = '';
              }}
              onLoad={() => setPosterLoading(false)}
            />
          )}
        </AnimatePresence>
        <FormControl sticky>
          <DangerButton
            type='button'
            onClick={onBackdropClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            shadow
          >
            Close
          </DangerButton>
          <SuccessButton
            type='sunbmit'
            whileHover={{ scale: processing ? 1 : 1.05 }}
            whileTap={{ scale: processing ? 1 : 0.95 }}
            disabled={processing}
            shadow
          >
            {action}
          </SuccessButton>
        </FormControl>
      </Form>
    </Modal>
  );
}

const PosterPriviewer = styled.img`
  grid-column: span 2;
  object-fit: cover;
  width: 100%;
  border-radius: 10px;
`;
