import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useMountedState from '../../hooks/useMountedState';
import { useAPIContext } from '../../contexts/APIContext';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import Modal from '../Modal';
import { ThumbnailPriviewer, VideoPriviewer } from './EpisodeModal.styles';
import { Form, FormTitle, FormControl } from '../../styles/forms';
import {
  PrimaryButton,
  DangerButton,
  SuccessButton
} from '../../styles/buttons';
import { getVideoSource } from '../../helpers';

export default function EpisodeModal({
  onBackdropClick,
  onSuccess,
  action,
  episode
}) {
  const {
    API: { Episode }
  } = useAPIContext();
  const params = useParams();
  const [episodeNumber, setEpisodeNumber] = useState(
    (episode && episode.episodeNumber.toString()) || ''
  );
  const [title, setTitle] = useState((episode && episode.title) || '');
  const [thumbnail, setThumbnail] = useState(
    (episode && episode.thumbnail) || null
  );
  const [video, setVideo] = useState(
    (episode && getVideoSource(episode.videoId)) || null
  );
  const [thumbnailLoading, setThumbnailLoading] = useState(true);
  const [processing, setProcessing] = useMountedState(false);
  const [isValidEpisodeNumber, setIsValidEpisodeNumber] = useState(false);
  const [checkingEpisodeNumber, setCheckingEpisodeNumber] = useState(false);
  const newEpisodeForm = useRef(null);
  const videoPriviewerRef = useRef(null);

  useEffect(() => {
    if (episodeNumber.match(/\D/))
      setEpisodeNumber(episodeNumber.replace(/\D/, ''));
    if (!episodeNumber) return;
    if (episode && episodeNumber == episode.episodeNumber) return;
    const timer = setTimeout(() => {
      setCheckingEpisodeNumber(true);
      toast.promise(
        Episode.isAvailableEpisodeNumber(params.slug, episodeNumber).finally(
          () => setCheckingEpisodeNumber(false)
        ),
        {
          loading: 'Checking episode number',
          success: data => {
            if (!data.isAvailable)
              throw new Error('Episode number is unavailable');
            setIsValidEpisodeNumber(data.isAvailable);
            return `Episode number is available`;
          },
          error: err => err.message
        },
        {
          id: 'checkEpisodeNumber'
        }
      );
    }, 500);
    return () => clearTimeout(timer);
  }, [episodeNumber]);

  useEffect(() => {
    if (videoPriviewerRef.current) videoPriviewerRef.current.load();
  }, [video]);

  const handleSubmit = e => {
    if (processing) return;
    e.preventDefault();
    if (!episodeNumber) return toast.error('Episode number is required!');
    if (!video) return toast.error('Video is required!');
    if (
      episode &&
      episodeNumber == episode.episodeNumber &&
      title == episode.title &&
      thumbnail == episode.thumbnail &&
      video === getVideoSource(episode.videoId)
    )
      return toast.error('There is nothing to update');
    const formData = new FormData(newEpisodeForm.current);
    if (action === 'Create' && !title) formData.delete('title');
    if (!thumbnail) formData.delete('thumbnail');
    if (episode && episodeNumber == episode.episodeNumber)
      formData.delete('episodeNumber');
    if (episode && title == episode.title) formData.delete('title');
    if (episode && thumbnail === episode.thumbnail)
      formData.delete('thumbnail');
    if (episode && thumbnail === null)
      formData.append('removeThumbnail', 'true');
    if (episode && video === getVideoSource(episode.videoId))
      formData.delete('video');
    setProcessing(true);
    toast.promise(
      (action === 'Create'
        ? Episode.create(params.slug, formData)
        : Episode.update(params.slug, params.episodeNumber, formData)
      ).finally(() => setProcessing(false)),
      {
        loading: `${action === 'Create' ? 'Creating' : 'Updating'} episode`,
        success: data => {
          if (onSuccess) onSuccess(data.episodeNumber);
          if (data.accessToken) setAccessToken(data.accessToken);
          return data.message;
        },
        error: `Failed to ${action.toLowerCase()} episode\nPlease check your connections`
      }
    );
  };

  const onThumbnailSelect = e => {
    const file = e.target.files[0];
    if (file) setThumbnail(URL.createObjectURL(file));
  };

  const onVideoSelect = e => {
    const file = e.target.files[0];
    if (file) setVideo(URL.createObjectURL(file));
  };

  return (
    <Modal onBackdropClick={onBackdropClick}>
      <Form
        onSubmit={handleSubmit}
        pd='.5em'
        ref={newEpisodeForm}
        encType='multipart/form-data'
      >
        <FormTitle>{action} episode</FormTitle>
        <label htmlFor='episodeNumber'>Episode number</label>
        <input
          type='text'
          name='episodeNumber'
          id='episodeNumber'
          value={episodeNumber}
          onChange={e => setEpisodeNumber(e.target.value)}
        />
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          name='title'
          id='title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <PrimaryButton
          as={motion.label}
          whileHover={{ scale: 1.0125 }}
          whileTap={{ scale: 0.9875 }}
          data-select-media
        >
          Select a thumbnail
          <input
            onChange={onThumbnailSelect}
            type='file'
            name='thumbnail'
            accept='image/*'
            hidden
          />
        </PrimaryButton>
        <AnimatePresence>
          {thumbnail && (
            <ThumbnailPriviewer
              as={motion.img}
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: thumbnailLoading ? 0 : 'auto',
                opacity: thumbnailLoading ? 0 : 1
              }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 1
              }}
              src={thumbnail}
              alt='poster-preview'
              onClick={() => {
                setThumbnail(null);
                setThumbnailLoading(true);
              }}
              onLoad={() => setThumbnailLoading(false)}
            />
          )}
        </AnimatePresence>
        <PrimaryButton
          as={motion.label}
          whileHover={{ scale: 1.0125 }}
          whileTap={{ scale: 0.9875 }}
          data-select-media
        >
          Select a video
          <input
            onChange={onVideoSelect}
            type='file'
            name='video'
            accept='video/*'
            hidden
          />
        </PrimaryButton>
        <AnimatePresence>
          {video && (
            <VideoPriviewer
              as={motion.video}
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: 'auto',
                opacity: 1
              }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 1
              }}
              controls
              preload='metadata'
              ref={videoPriviewerRef}
            >
              <source src={video} />
            </VideoPriviewer>
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
