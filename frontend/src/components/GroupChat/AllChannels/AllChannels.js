import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  List,
  ListItem,
  StyledHeader,
  StyledInput,
  InputWrapper,
} from './AllChannels.styles';
import { AsideContent } from '../SelectedChannel/SelectedChannel.styles';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getChannels, createChannel } from 'app/channelSlice';
import { Routes, Route, useParams } from 'react-router-dom';
import AddNewChannel from '../AddNewChannel/AddNewChannel';

const AllChannels = ({ setIsAllChannelsSelected }) => {
  const channels = useSelector((state) => state.channel);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const params = useParams();
  const [isAddChannelFormOpen, setIsAddChannelOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleCloseForm = () => {
    setIsAddChannelOpen(false);
  };

  useEffect(() => {
    dispatch(getChannels()).catch((err) => console.log(err));
  }, []);

  const channelsValues = Object.values(channels).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const filteredChannelsValues = channelsValues.filter((channel) =>
    channel.name.toLowerCase().includes(inputValue.trim().toLowerCase())
  );

  return (
    <>
      <StyledHeader>
        <h1>Channels</h1>
        <button onClick={() => setIsAddChannelOpen(!isAddChannelFormOpen)}>
          <FontAwesomeIcon icon={['fa', 'plus']} />
        </button>
      </StyledHeader>

      <AsideContent>
        <InputWrapper>
          <StyledInput
            placeholder="search"
            value={inputValue}
            onChange={({ target }) => setInputValue(target.value)}
          />
          <FontAwesomeIcon icon={['fa', 'magnifying-glass']} />
        </InputWrapper>
        <List>
          {filteredChannelsValues.map((channel, index) => (
            <Link
              onClick={() => setIsAllChannelsSelected(false)}
              to={`/chat/${channel.id}`}
              key={index}
            >
              <ListItem>
                <div>{channel.abbreviation}</div>

                {channel.name}
              </ListItem>
            </Link>
          ))}
        </List>
      </AsideContent>
      {isAddChannelFormOpen ? (
        <AddNewChannel handleCloseForm={handleCloseForm} />
      ) : null}
    </>
  );
};

export default AllChannels;