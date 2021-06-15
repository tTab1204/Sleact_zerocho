import React, { useCallback, VFC } from 'react';
import useInput from '@hooks/useInput';
import Modal from '@components/Modal';
import { Label, Button, Input } from '@pages/SignUp/styles';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IChannel, IUser } from '@typings/db';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowCreateChannelModal: (flag: boolean) => void;
}

const CreateChannelModal: VFC<Props> = ({ show, onCloseModal, setShowCreateChannelModal }) => {
  const [newChannel, onChangeNewChannel, setNewChannel] = useInput('');
  // 파라미터 자리에 있는 데이터를 useParams로 가져올 수 있다.
  // ex) :workspace/:channel 이런것들
  // 이렇게 하면 주소로부터 데이터를 가져올 수 있기 때문에
  // 상태로 관리 안해도 되는 장점이 생긴다!
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();

  const { data: userData, error, revalidate, mutate } = useSWR<IUser | false>(
    'http://localhost:3095/api/users',
    fetcher,
  );
  const { data: channelData, revalidate: revalidateChannel } = useSWR<IChannel[]>(
    userData ? `http://localhost:3095/api/workspaces/${workspace}/channels` : null,
    fetcher,
  );

  const onCreateChannel = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(`http://localhost:3095/api/workspaces/${workspace}/channels`, {
          name: newChannel, // 채널명
          withCredentials: true, // 쿠키 전달을 위한 것
        })
        .then(() => {
          setShowCreateChannelModal(false);
          revalidateChannel();
          setNewChannel('');
        })
        .catch((error) => {
          console.dir(error);
          toast.error(error.response?.data, { position: 'bottom-center' });
        });
    },
    [newChannel],
  );
  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onCreateChannel}>
        <Label id="channel-label">
          <span>채널</span>
          <Input id="workspace" value={newChannel} onChange={onChangeNewChannel} />
        </Label>
        <Button type="submit">생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateChannelModal;
